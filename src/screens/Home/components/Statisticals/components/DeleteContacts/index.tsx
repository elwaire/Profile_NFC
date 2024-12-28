import { Button, Popconfirm } from "antd";
import { memo, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "~/core/configs/firebase";
import log from "~/core/utils/log";

type DeleteContactsProps = {
    id: string;
};

const DeleteContacts: React.FC<DeleteContactsProps> = (props) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, "contacts", props.id));
            log("Contact deleted successfully");
        } catch (error) {
            log("Failed to delete contact", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDelete()}
            okText="Yes"
            cancelText="No"
        >
            <Button icon={<DeleteOutlined />} danger loading={loading}>
                Delete
            </Button>
        </Popconfirm>
    );
};

export default memo(DeleteContacts);
