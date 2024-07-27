import { Button, Space } from "antd";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { BlogsActions } from "~/core/store";
import { DeleteOutlined } from "@ant-design/icons";

type RemoveCardSectionBlogProps = {
    keyCardSection: string;
};

const RemoveCardSectionBlog: React.FC<RemoveCardSectionBlogProps> = ({ keyCardSection }) => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.blogs.sections);

    const handleRemoveSection = (key: string) => {
        dispatch(BlogsActions.update({ sections: sections.filter((section) => section.key !== key) }));
    };

    return (
        <Space>
            {sections.length > 1 && (
                <Button type="link" onClick={() => handleRemoveSection(keyCardSection)} icon={<DeleteOutlined />}>
                    Remove
                </Button>
            )}
        </Space>
    );
};

export default memo(RemoveCardSectionBlog);
