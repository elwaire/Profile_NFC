import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, FormInstance, Input } from "antd";
import React, { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { BlogsActions, ProjectsActions } from "~/core/store";
import RemoveCardSectionProject from "./components/RemoveCardSectionProject";
import RemoveContentSectionProject from "./components/RemoveContentSectionProject";
import UploadImageSection from "./components/UploadImageSection";
import "./styles.scss";

interface CardSectionProjectProps {
    section: {
        key: string;
        images: Array<{ uid: string; url: string }>;
        contents: string[];
    };
    index: number;
    form: FormInstance<any>;
}

const CardSectionProject: React.FC<CardSectionProjectProps> = ({ section, index, form }) => {
    const dispatch = useAppDispatch();
    const { sections, loading } = useAppSelector((state) => state.root.projects);

    const handleAddContent = useCallback(
        (sectionKey: string) => {
            dispatch(
                ProjectsActions.update({
                    sections: sections.map((section) =>
                        section.key === sectionKey
                            ? {
                                  ...section,
                                  contents: [...section.contents, ""],
                              }
                            : section,
                    ),
                }),
            );
        },
        [sections],
    );

    return (
        <Card
            key={section.key}
            title={`Section ${index + 1}`}
            extra={<RemoveCardSectionProject keyCardSection={section.key} />}
            style={{ marginBottom: 16 }}
        >
            <UploadImageSection section={section} />
            {section.contents.map((content, contentIndex) => (
                <Form.Item
                    key={`content-${section.key}-${contentIndex}`}
                    name={`content-${section.key}-${contentIndex}`}
                    label={`Content ${contentIndex + 1}`}
                    rules={[{ required: true, message: "Please input the content!" }]}
                    initialValue={content}
                    extra={
                        contentIndex > 0 && (
                            <RemoveContentSectionProject
                                form={form}
                                sesstionKey={section.key}
                                contentIndex={contentIndex}
                            />
                        )
                    }
                >
                    <Input.TextArea
                        rows={4}
                        disabled={loading}
                        onChange={(e) => {
                            dispatch(
                                BlogsActions.update({
                                    sections: sections.map((section) =>
                                        section.key === section.key
                                            ? {
                                                  ...section,
                                                  contents: section.contents.map((c, i) =>
                                                      i === contentIndex ? e.target.value : c,
                                                  ),
                                              }
                                            : section,
                                    ),
                                }),
                            );
                        }}
                    />
                </Form.Item>
            ))}
            <Button
                type="dashed"
                onClick={() => handleAddContent(section.key)}
                block
                icon={<PlusOutlined />}
                loading={loading}
                disabled={loading}
            >
                Add New Content
            </Button>
        </Card>
    );
};

export default memo(CardSectionProject);
