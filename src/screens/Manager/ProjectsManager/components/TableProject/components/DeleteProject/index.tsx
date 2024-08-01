import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { memo } from "react";
import { db, storage } from "~/core/configs/firebase";
import { ProjectPost } from "~/core/types/Entities/Project";

type DeleteProjectProps = {
    refetchPosts: () => void;
    data: ProjectPost;
};
const DeleteProject: React.FC<DeleteProjectProps> = (props) => {
    const handleDelete = async () => {
        try {
            await Promise.all([
                // 1. Xoá tất cả hình ảnh liên quan
                ...props.data.sections.map((section) => {
                    return Promise.all(
                        section.images.map((image) => {
                            const imageRef = ref(storage, `projects_images/${image.uid}`);
                            return deleteObject(imageRef);
                        }),
                    );
                }),
                // 2. Xoá document từ Firestore
                deleteDoc(doc(db, "projects", props.data.id)),
            ]);

            message.success("Post and related images deleted successfully");
            props.refetchPosts(); // Refresh the list
        } catch (error) {
            console.error("Error deleting post and images:", error);
            message.error("Failed to delete post and images");
        }
    };

    return (
        <Popconfirm
            title="Are you sure you want to delete this post and all related images?"
            onConfirm={() => handleDelete()}
            okText="Yes"
            cancelText="No"
        >
            <Button icon={<DeleteOutlined />} danger>
                Delete
            </Button>
        </Popconfirm>
    );
};

export default memo(DeleteProject);
