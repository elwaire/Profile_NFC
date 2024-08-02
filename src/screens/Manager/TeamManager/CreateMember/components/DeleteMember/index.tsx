import { Button, message, Modal } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { memo, useState } from "react";
import { db } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { TeamActions } from "~/core/store";
import { DeleteOutlined } from "@ant-design/icons";

type DeleteMemberProps = {
    id: string;
    memberName: string;
};

const DeleteMember: React.FC<DeleteMemberProps> = ({ id, memberName }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useAppDispatch();
    const { listTeam } = useAppSelector((state) => state.root.team);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async () => {
        dispatch(TeamActions.update({ loading: true }));
        try {
            await deleteDoc(doc(db, "teamMembers", id));
            message.success(`Đã xóa thành viên ${memberName} thành công`);

            dispatch(
                TeamActions.update({
                    listTeam: listTeam.filter((member) => member.id !== id),
                }),
            );
        } catch (error) {
            console.error("Lỗi khi xóa thành viên:", error);
            message.error("Có lỗi xảy ra khi xóa thành viên");
        } finally {
            dispatch(TeamActions.update({ loading: false }));
            setIsModalVisible(false);
        }
    };

    return (
        <>
            <Button icon={<DeleteOutlined />} danger onClick={showModal}>
                Xóa
            </Button>
            <Modal
                title="Xác nhận xóa thành viên"
                visible={isModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p>Bạn có chắc chắn muốn xóa thành viên {memberName}?</p>
                <p>Hành động này không thể hoàn tác.</p>
            </Modal>
        </>
    );
};
export default memo(DeleteMember);
