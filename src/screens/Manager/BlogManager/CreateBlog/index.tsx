import { Button, Form, Input, message } from "antd";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React from "react";
import { Title } from "~/core/components";
import { db } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { BlogsActions } from "~/core/store";
import CardSectionBlog from "./components/CardSectionBlog";
import "./styles.scss";
import ButtonAddSectionBlog from "./components/ButtonAddSectionBlog";
import { useNavigate } from "react-router-dom";
import PATHS from "~/core/constants/path";

const CreateBlog: React.FC = () => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.blogs.sections);

    const navigate = useNavigate();

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
            dispatch(BlogsActions.update({ sections: [{ key: "0", images: [], contents: [""] }] }));

            navigate(PATHS.MANAGER.BLOG.ROOT);
        } catch (error) {
            console.error("Error creating blog post:", error);
            message.error("An error occurred while creating the blog post.");
        }
    };

    return (
        <div className="blog_manager__container">
            <Title title="Blog Manager" backPage />
            <div className="blog_manager__container__wrapper">
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Blog Title"
                        rules={[{ required: true, message: "Please input the blog title!" }]}
                    >
                        <Input />
                    </Form.Item>

                    {sections.map((section, index) => (
                        <CardSectionBlog key={section.key} section={section} index={index} form={form} />
                    ))}
                    <ButtonAddSectionBlog />

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create Blog Post
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateBlog;
