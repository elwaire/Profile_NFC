import { Button, Card, Form, Input, Result, Spin } from "antd";
import Upload, { RcFile, UploadChangeParam } from "antd/es/upload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "~/core/configs/firebase";
import PATHS from "~/core/constants/path";
import { useResource } from "~/core/hooks";
import { Resource } from "~/core/store/reducers/resources/types";
import log from "~/core/utils/log";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { BackPage } from "~/core/components";

const EditResources: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [imageFile, setImageFile] = useState<RcFile | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const { isValidId } = useResource(id);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                if (!id) return;

                const docRef = doc(db, "resources", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as Resource;
                    form.setFieldsValue(data);
                    if (data.imageUrl) {
                        setImageUrl(data.imageUrl);
                    }
                }
            } catch (error) {
                log("Failed to fetch resource");
                console.error("Error fetching resource:", error);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchResource();
    }, [id, form]);

    const handleImageChange = (info: UploadChangeParam) => {
        if (info.file) {
            setImageFile(info.file as RcFile);
        }
    };

    const uploadImage = async (file: RcFile): Promise<string> => {
        const storageRef = ref(storage, `resources/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const deleteOldImage = async (oldImageUrl: string) => {
        if (!oldImageUrl) return;
        try {
            const oldImageRef = ref(storage, oldImageUrl);
            await deleteObject(oldImageRef);
        } catch (error) {
            console.error("Error deleting old image:", error);
        }
    };

    const onFinish = async (values: Resource) => {
        if (!id) return;
        try {
            setLoading(true);

            let finalImageUrl = imageUrl;
            if (imageFile) {
                // Delete old image if exists
                if (imageUrl) {
                    await deleteOldImage(imageUrl);
                }
                // Upload new image
                finalImageUrl = await uploadImage(imageFile);
            }

            const docRef = doc(db, "resources", id);
            await updateDoc(docRef, {
                ...values,
                imageUrl: finalImageUrl,
                updatedAt: new Date().toISOString(),
            });

            log("Resource updated successfully");
            navigate(PATHS.MANAGER.RESOURCE.ROOT);
        } catch (error) {
            log("Failed to update resource");
            console.error("Error updating resource:", error);
        } finally {
            setLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    if (!isValidId) {
        return <Result status="404" title="404" subTitle="Sorry, the resource you visited does not exist." />;
    }

    return (
        <div className="w-full py-8 px-8">
            <BackPage />
            <Card title="Edit Resource" className="max-w-2xl mx-auto">
                <Spin spinning={fetchLoading}>
                    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: "Please input the title!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Note"
                            name="note"
                            rules={[{ required: true, message: "Please input the note!" }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            label="Button Label"
                            name="buttonLabel"
                            rules={[{ required: true, message: "Please input the button label!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Link"
                            name="link"
                            rules={[
                                { required: true, message: "Please input the link!" },
                                { type: "url", message: "Please enter a valid URL!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[{ required: true, message: "Please input the category!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Image">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleImageChange}
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Update Resource
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
    );
};

export default memo(EditResources);
