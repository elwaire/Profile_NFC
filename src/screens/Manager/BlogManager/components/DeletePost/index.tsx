import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { memo } from "react";
import { db } from "~/core/configs/firebase";
import { BlogPost } from "~/core/types";

type DeletePostProps = {
    refetchPosts: () => void;
    record: BlogPost;
};

const DeletePost: React.FC<DeletePostProps> = (props) => {
    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            message.success("Post deleted successfully");
            props.refetchPosts(); // Refresh the list
        } catch (error) {
            console.error("Error deleting post:", error);
            message.error("Failed to delete post");
        }
    };

    return (
        <Popconfirm
            title="Are you sure you want to delete this post?"
            onConfirm={() => handleDelete(props.record.id)}
            okText="Yes"
            cancelText="No"
        >
            <Button icon={<DeleteOutlined />} danger>
                Delete
            </Button>
        </Popconfirm>
    );
};

export default memo(DeletePost);
