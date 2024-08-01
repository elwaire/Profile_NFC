// ImageUpload.tsx
import React, { memo } from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { AboutUsActions } from "~/core/store";
import "./styles.scss";

interface UploadImageProps {
    imageUrl: string;
    onImageChange: (url: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ imageUrl, onImageChange }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.root.aboutUs);

    const handleUploadImage = async (file: RcFile) => {
        dispatch(AboutUsActions.update({ loading: true }));
        try {
            const imageRef = ref(storage, `aboutUs/main-image`);

            if (imageUrl) {
                const oldImageRef = ref(storage, imageUrl);
                await deleteObject(oldImageRef);
            }

            await uploadBytes(imageRef, file);
            const downloadUrl = await getDownloadURL(imageRef);
            onImageChange(downloadUrl);
            return downloadUrl;
        } catch (error) {
            console.error("Lỗi khi tải lên hình ảnh:", error);
            message.error("Đã xảy ra lỗi khi tải lên hình ảnh");
        } finally {
            dispatch(AboutUsActions.update({ loading: false }));
        }
    };

    return (
        <div className="upload_image__container">
            <img src={imageUrl} alt="about us" style={{ width: "100%" }} />
            <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={async (file) => {
                    await handleUploadImage(file);
                    return false;
                }}
                disabled={loading}
                className="upload_image__container__btn"
            >
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
            </Upload>
        </div>
    );
};

export default memo(UploadImage);
