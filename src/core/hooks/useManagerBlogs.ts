import { Form, message } from "antd";
import { useState } from "react";
import { BlogSection } from "../types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../configs/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const useManagerBlogs = () => {
    const [form] = Form.useForm();
    const [sections, setSections] = useState<BlogSection[]>([{ key: "0", images: [], contents: [""] }]);
    const [editingSectionKey, setEditingSectionKey] = useState<string | null>(null);

    const handleAddSection = () => {
        const newKey = Date.now().toString();
        setSections([...sections, { key: newKey, images: [], contents: [""] }]);
    };

    const handleRemoveSection = (key: string) => {
        setSections(sections.filter((section) => section.key !== key));
    };

    const handleImageUpload = async (file: File, sectionKey: string) => {
        try {
            const section = sections.find((s) => s.key === sectionKey);
            if (section && section.images.length >= 4) {
                message.error("Maximum 4 images allowed per section");
                return "";
            }
            const imageRef = ref(storage, `blog_images/${file.name}`);
            await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(imageRef);
            setSections(
                sections.map((section) =>
                    section.key === sectionKey ? { ...section, images: [...section.images, imageUrl] } : section,
                ),
            );
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            message.error("Failed to upload image");
            return "";
        }
    };

    const handleRemoveImage = (sectionKey: string, imageUrl: string) => {
        setSections(
            sections.map((section) =>
                section.key === sectionKey
                    ? { ...section, images: section.images.filter((url) => url !== imageUrl) }
                    : section,
            ),
        );
    };

    const handleAddContent = (sectionKey: string) => {
        setSections(
            sections.map((section) =>
                section.key === sectionKey ? { ...section, contents: [...section.contents, ""] } : section,
            ),
        );
    };

    const handleEditSection = (sectionKey: string) => {
        setEditingSectionKey(sectionKey);
    };

    const handleSaveEdit = (values: any) => {
        if (editingSectionKey) {
            setSections(
                sections.map((section) =>
                    section.key === editingSectionKey
                        ? {
                              ...section,
                              contents: Object.keys(values)
                                  .filter((key) => key.startsWith(`content-${editingSectionKey}`))
                                  .map((key) => values[key]),
                          }
                        : section,
                ),
            );
            setEditingSectionKey(null);
        }
    };

    const onFinish = async (values: any) => {
        try {
            const blogData = {
                title: values.title,
                sections: sections.map((section) => ({
                    images: section.images,
                    contents: section.contents.filter((content) => content.trim() !== ""),
                })),
                createdAt: Timestamp.now(),
            };

            await addDoc(collection(db, "blogs"), blogData);
            message.success("Blog post created successfully!");
            form.resetFields();
            setSections([{ key: "0", images: [], contents: [""] }]);
        } catch (error) {
            console.error("Error creating blog post:", error);
            message.error("An error occurred while creating the blog post.");
        }
    };

    return {
        form,
        sections,
        editingSectionKey,
        handleAddSection,
        handleRemoveSection,
        handleImageUpload,
        handleRemoveImage,
        handleAddContent,
        handleEditSection,
        handleSaveEdit,
        onFinish,
    };
}

export default useManagerBlogs;