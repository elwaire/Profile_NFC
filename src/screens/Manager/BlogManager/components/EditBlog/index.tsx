import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo } from "react";
import { BlogPost } from "~/core/types";

type EditBlogProps = {
    record: BlogPost;
};

const EditBlog: React.FC<EditBlogProps> = ({ record }) => {
    const handleEdit = (id: string) => {
        // Implement edit functionality
        // This could navigate to an edit page or open a modal
        console.log("Edit post:", id);
    };

    return (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
            Edit
        </Button>
    );
};

export default memo(EditBlog);
