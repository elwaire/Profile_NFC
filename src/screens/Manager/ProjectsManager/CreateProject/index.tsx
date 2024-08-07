import { Button, Form, message } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormItem, Title } from "~/core/components";
import { db } from "~/core/configs/firebase";
import PATHS from "~/core/constants/path";
import { useAppDispatch, useAppSelector, useCheckData } from "~/core/hooks";
import { getDataFirebaseById } from "~/core/services";
import { ProjectsActions } from "~/core/store";
import log from "~/core/utils/log";
import ButtonAddSectionProject from "./components/ButtonAddSectionProject";
import CardSectionBlog from "./components/CardSectionProject";
import "./styles.scss";

const CreateProject: React.FC = () => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const { sections, loading } = useAppSelector((state) => state.root.projects);

    const { checkSnapshot } = useCheckData();
    const param = useParams();
    const navigate = useNavigate();

    const handleSetDataEdit = async () => {
        dispatch(ProjectsActions.update({ loading: true }));
        try {
            const docSnap = await getDataFirebaseById("projects", `${param.id}`);

            checkSnapshot(docSnap);

            if (docSnap.exists()) {
                const data = docSnap.data();

                const sections = data.sections.map((section: any, index: number) => ({
                    key: `edit-${index}`, // Sử dụng một key duy nhất
                    images: section.images || [],
                    contents: section.contents || [""],
                }));

                dispatch(ProjectsActions.update({ sections }));
                form.setFieldsValue({
                    title: data.title,
                    description: data.description,
                    link: data.link,
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
            dispatch(ProjectsActions.update({ loading: false }));
        }
    };

    const resetFormAndState = useCallback(() => {
        form.resetFields();
        dispatch(ProjectsActions.update({ sections: [{ key: "0", images: [], contents: [""] }] }));
    }, [form, dispatch]);

    React.useEffect(() => {
        if (param.id) {
            handleSetDataEdit();
        }

        return () => {
            resetFormAndState();
        };
    }, [param.id]);

    const onFinish = useCallback(
        async (values: any) => {
            dispatch(ProjectsActions.update({ loading: true }));
            try {
                const projectsData = {
                    title: values.title,
                    description: values.description,
                    link: values.link,
                    sections: sections.map((section) => ({
                        images: section.images,
                        contents: section.contents.filter((content) => content.trim() !== ""),
                    })),
                    timeCreated: new Date().toISOString(),
                };

                if (param.id) {
                    const projectRef = doc(db, "projects", param.id);

                    await updateDoc(projectRef, projectsData);
                    message.success("Project post updated successfully!");
                } else {
                    // Tạo bài viết mới
                    projectsData.timeCreated = new Date().toISOString();
                    await addDoc(collection(db, "projects"), projectsData);
                    message.success("Project post created successfully!");
                }

                form.resetFields();
                dispatch(ProjectsActions.update({ sections: [{ key: "0", images: [], contents: [""] }] }));
                navigate(PATHS.MANAGER.PROJECT.ROOT);
            } catch (error) {
                console.error("Error creating project post:", error);
                message.error("An error occurred while creating the project post.");
            } finally {
                dispatch(ProjectsActions.update({ loading: false }));
            }
        },
        [sections],
    );

    const renderForm = useMemo(() => {
        return (
            <div className="projects_manager__container__wrapper">
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <FormItem
                        name="title"
                        label="Project Title"
                        rules={[{ required: true, message: "Please input the project title!" }]}
                    />

                    <FormItem
                        name="description"
                        label="Project Description"
                        rules={[{ required: true, message: "Please input the project description!" }]}
                    />

                    <FormItem
                        name="link"
                        label="Project Link"
                        rules={[{ required: true, message: "Please input the project link!" }]}
                    />

                    {sections.map((section, index) => (
                        <CardSectionBlog key={section.key} section={section} index={index} form={form} />
                    ))}
                    <ButtonAddSectionProject />
                    <FormItem>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {param.id ? "Update Project" : "Create Project"}
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }, [form, sections, loading]);

    return (
        <div className="projects_manager__container">
            <Title title="Project Manager" backPage />
            {renderForm}
        </div>
    );
};

export default CreateProject;
