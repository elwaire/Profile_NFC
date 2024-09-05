import { Button, Form, Input, message, Select } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormItem, Title } from "~/core/components";
import { db } from "~/core/configs/firebase";
import PATHS from "~/core/constants/path";
import { useAppDispatch, useAppSelector, useCheckData } from "~/core/hooks";
import { getDataFirebaseById } from "~/core/services";
import { BlogsActions } from "~/core/store";
import log from "~/core/utils/log";
import ButtonAddSectionBlog from "./components/ButtonAddSectionBlog";
import CardSectionBlog from "./components/CardSectionBlog";
import "./styles.scss";
import { Option } from "antd/es/mentions";

const CreateBlog: React.FC = () => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const { sections, loading } = useAppSelector((state) => state.root.blogs);

    const { checkSnapshot } = useCheckData();
    const param = useParams();
    const navigate = useNavigate();

    const handleSetDataEdit = async () => {
        dispatch(BlogsActions.update({ loading: true }));
        try {
            const docSnap = await getDataFirebaseById("blogs", `${param.id}`);

            checkSnapshot(docSnap);

            if (docSnap.exists()) {
                const data = docSnap.data();

                const sections = data.sections.map((section: any, index: number) => ({
                    key: `edit-${index}`, // Sử dụng một key duy nhất
                    images: section.images || [],
                    contents: section.contents || [""],
                }));

                dispatch(BlogsActions.update({ sections }));
                form.setFieldsValue({
                    title: data.title,
                    tags: data.tags,
                    status: data.status || "new",
                    ...sections.reduce((acc: any, section: any) => {
                        section.contents.forEach((content: any, contentIndex: any) => {
                            acc[`content-${section.key}-${contentIndex}`] = content;
                        });
                        return acc;
                    }, {}),
                });
            }
        } catch (error) {
            log("error", error);
        } finally {
            dispatch(BlogsActions.update({ loading: false }));
        }
    };

    const resetFormAndState = useCallback(() => {
        form.resetFields();
        dispatch(BlogsActions.update({ sections: [{ key: "0", images: [], contents: [""] }] }));
    }, [form, dispatch]);

    React.useEffect(() => {
        if (param.id) {
            handleSetDataEdit();
        } else {
            form.setFieldsValue({ status: "new", tags: "blog" });
        }

        return () => {
            resetFormAndState();
        };
    }, [param.id]);

    const onFinish = async (values: any) => {
        dispatch(BlogsActions.update({ loading: true }));
        try {
            const blogData = {
                title: values.title,
                tags: values.tags,
                status: values.status,
                sections: sections.map((section) => ({
                    images: section.images,
                    contents: section.contents.filter((content) => content.trim() !== ""),
                })),
            };

            if (param.id) {
                const blogRef = doc(db, "blogs", param.id);
                await updateDoc(blogRef, {
                    ...blogData,
                    timeUpdated: new Date().toISOString(),
                });
                message.success("Blog post updated successfully!");
            } else {
                await addDoc(collection(db, "blogs"), {
                    ...blogData,
                    timeCreated: new Date().toISOString(),
                });
                message.success("Blog post created successfully!");
            }

            form.resetFields();
            dispatch(BlogsActions.update({ sections: [{ key: "0", images: [], contents: [""] }] }));
            navigate(PATHS.MANAGER.BLOG.ROOT);
        } catch (error) {
            console.error("Error creating blog post:", error);
            message.error("An error occurred while creating the blog post.");
        } finally {
            dispatch(BlogsActions.update({ loading: false }));
        }
    };

    const renderForm = useMemo(() => {
        return (
            <div className="blog_manager__container__wrapper">
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <FormItem
                        name="title"
                        label="Blog Title"
                        rules={[{ required: true, message: "Please input the blog title!" }]}
                    />

                    <FormItem
                        name="tags"
                        label="Tags"
                        rules={[{ required: true, message: "Please select the blog tags!" }]}
                        initialValue="blog"
                    >
                        <Select placeholder="Select blog tags">
                            <Option value="blog">Blog</Option>
                            <Option value="learn-about">Learn About</Option>
                            <Option value="work">Work</Option>
                            <Option value="introduce">Introduce</Option>
                            <Option value="goals">Goals</Option>
                            <Option value="life">Life</Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select the blog status!" }]}
                    >
                        <Select placeholder="Select blog status">
                            <Option value="new">New</Option>
                            <Option value="popular">Popular</Option>
                            <Option value="trending">trending</Option>
                        </Select>
                    </FormItem>

                    {sections.map((section, index) => (
                        <CardSectionBlog key={section.key} section={section} index={index} form={form} />
                    ))}
                    <ButtonAddSectionBlog />
                    <FormItem>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {param.id ? "Update Blog" : "Create Blog"}
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }, [form, sections, loading]);

    return (
        <div className="blog_manager__container">
            <Title title="Blog Manager" backPage />
            {renderForm}
        </div>
    );
};

export default CreateBlog;
