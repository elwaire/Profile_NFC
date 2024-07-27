import { Form, message, Upload } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { memo } from "react";
import { storage } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { BlogsActions } from "~/core/store";
import { BlogSection } from "~/core/types";
import { PlusOutlined } from "@ant-design/icons";

type UploadImageSectionProps = {
    section: BlogSection;
};

const UploadImageSection: React.FC<UploadImageSectionProps> = ({ section }) => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.blogs.sections);
    const loading = useAppSelector((state) => {
        return state.root.blogs.loading;
    });

    const handleImageUpload = async (file: File, sectionKey: string) => {
        dispatch(BlogsActions.update({ loading: true }));
        try {
            const section = sections.find((s) => s.key === sectionKey);
            if (section && section.images.length >= 4) {
                message.error("Maximum 4 images allowed per section");
                return "";
            }
            const imageRef = ref(storage, `blog_images/${file.name}`);
            await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(imageRef);

            dispatch(
                BlogsActions.update({
                    sections: sections.map((section) =>
                        section.key === sectionKey ? { ...section, images: [...section.images, imageUrl] } : section,
                    ),
                }),
            );
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            message.error("Failed to upload image");
            return "";
        } finally {
            dispatch(BlogsActions.update({ loading: false }));
        }
    };

    const handleRemoveImage = (sectionKey: string, imageUrl: string) => {
        dispatch(
            BlogsActions.update({
                sections: sections.map((section) =>
                    section.key === sectionKey
                        ? { ...section, images: section.images.filter((url) => url !== imageUrl) }
                        : section,
                ),
            }),
        );
    };

    return (
        <Form.Item label="Images">
            <div className="group__card_section_blog">
                <Upload
                    listType="picture-card"
                    fileList={section.images.map((url, index) => ({
                        uid: `-${index}`,
                        name: `image-${index}`,
                        status: "done",
                        url: url,
                    }))}
                    beforeUpload={(file) => {
                        handleImageUpload(file, section.key);
                        return false;
                    }}
                    onRemove={(file) => handleRemoveImage(section.key, file.url || "")}
                    disabled={loading}
                >
                    {section.images.length < 4 && (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
                {loading && <div className="item__card_section_blog" />}
            </div>
        </Form.Item>
    );
};

export default memo(UploadImageSection);
