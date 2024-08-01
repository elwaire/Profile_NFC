import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { ProjectsActions } from "~/core/store";

const ButtonAddSectionProject: React.FC = () => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.projects.sections);

    const handleAddSection = () => {
        const newKey = Date.now().toString();
        dispatch(ProjectsActions.update({ sections: [...sections, { key: newKey, images: [], contents: [""] }] }));
    };

    return (
        <Form.Item>
            <Button type="dashed" onClick={handleAddSection} block icon={<PlusOutlined />}>
                Add New Section
            </Button>
        </Form.Item>
    );
};

export default memo(ButtonAddSectionProject);
