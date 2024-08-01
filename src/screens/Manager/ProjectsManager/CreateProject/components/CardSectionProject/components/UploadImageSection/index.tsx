import { PlusOutlined } from "@ant-design/icons";
import { Form, message, Upload } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { memo } from "react";
import { v4 as uuidv4 } from "uuid"; // Đảm bảo bạn đã cài đặt uuid package
import { storage } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { ProjectsActions } from "~/core/store";
import { BlogSection } from "~/core/types";

type UploadImageSectionProps = {
    section: BlogSection;
};

const UploadImageSection: React.FC<UploadImageSectionProps> = ({ section }) => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.projects.sections);
    const loading = useAppSelector((state) => state.root.projects.loading);

    const handleImageUpload = async (file: File, sectionKey: string) => {
        dispatch(ProjectsActions.update({ loading: true }));
        try {
            const section = sections.find((s) => s.key === sectionKey);
            if (section && section.images.length >= 4) {
                message.error("Maximum 4 images allowed per section");
                return null;
            }

            const uid = uuidv4(); // Tạo uid mới cho mỗi ảnh
            const imageRef = ref(storage, `projects_images/${uid}`);
            await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(imageRef);

            const newImage = {
                uid,
                url: imageUrl,
            };

            dispatch(
                ProjectsActions.update({
                    sections: sections.map((section) =>
                        section.key === sectionKey ? { ...section, images: [...section.images, newImage] } : section,
                    ),
                }),
            );
            return newImage;
        } catch (error) {
            console.error("Error uploading image:", error);
            message.error("Failed to upload image");
            return null;
        } finally {
            dispatch(ProjectsActions.update({ loading: false }));
        }
    };

    const handleRemoveImage = (sectionKey: string, imageUid: string) => {
        dispatch(
            ProjectsActions.update({
                sections: sections.map((section) =>
                    section.key === sectionKey
                        ? { ...section, images: section.images.filter((img) => img.uid !== imageUid) }
                        : section,
                ),
            }),
        );
    };

    return (
        <Form.Item label="Images">
            <div className="group__card_section_projects">
                <Upload
                    listType="picture-card"
                    fileList={section.images.map((img) => ({
                        uid: img.uid,
                        name: `image-${img.uid}`,
                        status: "done",
                        url: img.url,
                    }))}
                    beforeUpload={(file) => {
                        handleImageUpload(file, section.key);
                        return false;
                    }}
                    onRemove={(file) => handleRemoveImage(section.key, file.uid)}
                    disabled={loading}
                >
                    {section.images.length < 4 && (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
                {loading && <div className="item__card_section_projects" />}
            </div>
        </Form.Item>
    );
};

export default memo(UploadImageSection);
