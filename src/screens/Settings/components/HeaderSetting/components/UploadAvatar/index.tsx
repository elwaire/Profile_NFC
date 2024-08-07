import { message, Upload } from "antd";
import { memo } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "~/core/configs/firebase";
import { HeaderSettings } from "~/core/types";
import "./styles.scss";

type UploadAvatarProps = {
    settings: HeaderSettings;
    setSettings: React.Dispatch<React.SetStateAction<HeaderSettings>>;
};

const UploadAvatar: React.FC<UploadAvatarProps> = ({ setSettings, settings }) => {
    const handleLogoUpload = async ({ file }: any) => {
        const storageRef = ref(storage, `logos/${file.name}`);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(snapshot.ref);
            setSettings((prev: HeaderSettings) => ({ ...prev, logoUrl: downloadUrl, logoPath: `logos/${file.name}` }));
            message.success("Logo uploaded successfully");
        } catch (error) {
            message.error("Failed to upload logo");
        }
    };

    return (
        <section className="upload_avatar__container">
            <h3>Logo Upload</h3>
            <Upload listType="picture-card" showUploadList={false} customRequest={handleLogoUpload}>
                {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="logo" style={{ width: "100%" }} />
                ) : (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>
        </section>
    );
};

export default memo(UploadAvatar);
