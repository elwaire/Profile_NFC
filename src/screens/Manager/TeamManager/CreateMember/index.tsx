import { Button, Form, Input, message } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormItem, Title } from "~/core/components";
import { db } from "~/core/configs/firebase";
import PATHS from "~/core/constants/path";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { getDataFirebaseById } from "~/core/services";
import { TeamActions } from "~/core/store";
import { TeamMember } from "~/core/types";
import UploadAvatar from "./components/UploadAvatar";
import "./styles.scss";

const CreateTeamMember: React.FC = () => {
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.root.team);

    const { id } = useParams();

    const navigate = useNavigate();

    const onFinish = async (values: Omit<TeamMember, "photoUrl">) => {
        dispatch(TeamActions.update({ loading: true }));
        try {
            const teamMember: TeamMember = {
                ...values,
                photoUrl: imageFile || "",
            };

            if (id) {
                await updateDoc(doc(db, "teamMembers", id), teamMember as Partial<TeamMember>);
                message.success("Cập nhật thành viên thành công!");
            } else {
                await addDoc(collection(db, "teamMembers"), teamMember);
                message.success("Thêm thành viên thành công!");
            }

            form.resetFields();
            setImageFile(null);

            navigate(PATHS.MANAGER.TEAM.ROOT);
        } catch (error) {
            console.error("Lỗi khi thêm thành viên:", error);
            message.error("Có lỗi xảy ra khi thêm thành viên.");
        } finally {
            dispatch(TeamActions.update({ loading: false }));
        }
    };

    const fetchMemberDetails = async () => {
        if (!id) return;

        dispatch(TeamActions.update({ loading: true }));
        try {
            const docSnap = await getDataFirebaseById("teamMembers", id);

            if (docSnap.exists()) {
                const memberData = docSnap.data() as TeamMember;
                form.setFieldsValue(memberData);
                setImageFile(memberData.photoUrl);
            } else {
                message.error("Không tìm thấy thành viên!");
                navigate(PATHS.MANAGER.TEAM.ROOT);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin thành viên:", error);
            message.error("Có lỗi xảy ra khi lấy thông tin thành viên.");
        } finally {
            dispatch(TeamActions.update({ loading: false }));
        }
    };

    useEffect(() => {
        if (id) {
            fetchMemberDetails();
        }
    }, [id]);

    return (
        <div className="create_member__container">
            <Title title="Create Member" backPage />
            <Form form={form} onFinish={onFinish} layout="vertical">
                <FormItem name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                    <Input />
                </FormItem>
                <FormItem
                    name="nickname"
                    label="Nickname"
                    rules={[{ required: true, message: "Vui lòng nhập nickname" }]}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không hợp lệ" },
                    ]}
                >
                    <Input />
                </FormItem>
                <FormItem name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                    <Input.TextArea />
                </FormItem>
                <FormItem
                    name="jobPosition"
                    label="Vị trí công việc"
                    rules={[{ required: true, message: "Vui lòng nhập vị trí công việc" }]}
                >
                    <Input />
                </FormItem>
                <UploadAvatar setImageFile={setImageFile} initialImage={imageFile} />
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {id ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
};

export default CreateTeamMember;
