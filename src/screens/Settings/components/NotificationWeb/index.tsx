import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { FormItem } from "~/core/components";
import { db, storage } from "~/core/configs/firebase";

interface NotificationData {
    banner: string;
    title: string;
    link: string;
    description: string;
    updatedAt: number;
}

const NotificationWeb: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const fetchNotification = useCallback(async () => {
        try {
            const docRef = doc(db, "settings", "notificationWeb");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data() as NotificationData;
                form.setFieldsValue(data);
                setImageUrl(data.banner);
            }
        } catch (error) {
            console.error("Error fetching notification:", error);
            message.error("Không thể tải dữ liệu thông báo");
        }
    }, [form]);

    useEffect(() => {
        fetchNotification();
    }, [fetchNotification]);

    const uploadImage = useCallback(async (file: File): Promise<string> => {
        const storageRef = ref(storage, `notification-web/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    }, []);

    const onFinish = useCallback(
        async (values: NotificationData) => {
            setLoading(true);
            try {
                const docRef = doc(db, "settings", "notificationWeb");
                await setDoc(
                    docRef,
                    {
                        ...values,
                        banner: imageUrl,
                        updatedAt: new Date().toISOString(),
                    },
                    { merge: true },
                );
                message.success("Thông báo đã được cập nhật");
            } catch (error) {
                console.error("Error updating notification:", error);
                message.error("Không thể cập nhật thông báo");
            } finally {
                setLoading(false);
            }
        },
        [imageUrl],
    );

    const handleUpload = useCallback(
        async (info: any) => {
            const { status } = info.file;
            if (status === "done") {
                try {
                    const url = await uploadImage(info.file.originFileObj);
                    setImageUrl(url);
                    message.success(`${info.file.name} đã được tải lên thành công.`);
                } catch (error) {
                    console.error("Error uploading image:", error);
                    message.error(`${info.file.name} tải lên thất bại.`);
                }
            } else if (status === "error") {
                message.error(`${info.file.name} tải lên thất bại.`);
            }
        },
        [uploadImage],
    );

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <FormItem name="banner" label="Banner">
                <Upload
                    name="banner"
                    listType="picture-card"
                    showUploadList={false}
                    customRequest={({ onSuccess }: any) => {
                        setTimeout(() => {
                            onSuccess("ok");
                        }, 0);
                    }}
                    onChange={handleUpload}
                >
                    {imageUrl ? (
                        <img src={imageUrl} alt="banner" style={{ width: "100%" }} />
                    ) : (
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
            </FormItem>
            <FormItem name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
                <Input />
            </FormItem>
            <FormItem name="link" label="Link" rules={[{ required: true, message: "Vui lòng nhập link" }]}>
                <Input />
            </FormItem>
            <FormItem name="description" label="Mô tả">
                <Input.TextArea />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Lưu thông báo
                </Button>
            </FormItem>
        </Form>
    );
};

export default React.memo(NotificationWeb);
