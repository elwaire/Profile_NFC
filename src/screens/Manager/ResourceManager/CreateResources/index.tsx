import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { addDoc, collection } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { Title } from "~/core/components";
import { db, storage } from "~/core/configs/firebase";
import log from "~/core/utils/log";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import PATHS from "~/core/constants/path";

interface CreateResourcesValues {
    title: string;
    note: string;
    buttonLabel: string;
    link: string;
    category: string;
    imageUrl?: string;
}

const CreateResources: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<RcFile | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const navigate = useNavigate();

    const handleImageChange = async (info: any) => {
        if (info.file) {
            setImageFile(info.file);
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
            // Lấy path từ URL
            const oldImageRef = ref(storage, oldImageUrl);
            await deleteObject(oldImageRef);
        } catch (error) {
            console.error("Error deleting old image:", error);
        }
    };

    const onFinish = async (values: CreateResourcesValues) => {
        try {
            setLoading(true);

            // Upload ảnh mới nếu có
            let finalImageUrl = imageUrl;
            if (imageFile) {
                if (imageUrl) {
                    await deleteOldImage(imageUrl);
                }
                finalImageUrl = await uploadImage(imageFile);
                setImageUrl(finalImageUrl);
            }

            // Tạo document mới trong Firestore, chỉ lưu URL
            const resourceData = {
                title: values.title,
                note: values.note,
                buttonLabel: values.buttonLabel,
                link: values.link,
                category: values.category,
                imageUrl: finalImageUrl,
                createdAt: new Date().toISOString(),
            };

            await addDoc(collection(db, "resources"), resourceData);

            message.success("Resource created successfully!");
            form.resetFields();
            setImageFile(null);
            setImageUrl("");
            navigate(PATHS.MANAGER.RESOURCE.ROOT);
        } catch (error) {
            log("Error creating resource:", error);
            message.error("Failed to create resource");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create_resources__container">
            <Title title="Create Manager" />
            <div className="create_resources__container__form">
                <Form form={form} layout="vertical" onFinish={onFinish} className="max-w-lg mx-auto">
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input title!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="image" label="Image" valuePropName="file">
                        <Upload
                            beforeUpload={(file) => {
                                handleImageChange({ file });
                                return false; // Prevent auto upload
                            }}
                            maxCount={1}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="note" label="Note" rules={[{ required: true, message: "Please input note!" }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="buttonLabel"
                        label="Button Label"
                        rules={[{ required: true, message: "Please input button label!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="link"
                        label="Link"
                        rules={[
                            { required: true, message: "Please input link!" },
                            { type: "url", message: "Please enter a valid URL!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: "Please select category!" }]}
                    >
                        <Select>
                            <Select.Option value="UI/UX">UI/UX Design Resources</Select.Option>
                            <Select.Option value="solopreneur">Solopreneur Systems</Select.Option>
                            <Select.Option value="webflow">Webflow Guides</Select.Option>
                            {/* Thêm các category khác tại đây */}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Create Resource
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateResources;
