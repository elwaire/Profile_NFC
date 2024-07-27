import { Button, Form } from "antd";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { BlogsActions } from "~/core/store";
import { PlusOutlined } from "@ant-design/icons";

const ButtonAddSectionBlog: React.FC = () => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.blogs.sections);

    const handleAddSection = () => {
        const newKey = Date.now().toString();
        dispatch(BlogsActions.update({ sections: [...sections, { key: newKey, images: [], contents: [""] }] }));
    };

    return (
        <Form.Item>
            <Button type="dashed" onClick={handleAddSection} block icon={<PlusOutlined />}>
                Add New Section
            </Button>
        </Form.Item>
    );
};

export default memo(ButtonAddSectionBlog);
