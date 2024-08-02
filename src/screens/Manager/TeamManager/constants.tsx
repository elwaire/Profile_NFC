import { Avatar, Button, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import PATHS from "~/core/constants/path";
import { TeamMember } from "~/core/types";
import DeleteMember from "./CreateMember/components/DeleteMember";

const renderCloumns = () => {
    const columns = [
        {
            title: "Ảnh",
            dataIndex: "photoUrl",
            key: "photoUrl",
            render: (photoUrl: string) => <Avatar src={photoUrl.split(",")[0]} />,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            sorter: (a: TeamMember, b: TeamMember) => a.name.localeCompare(b.name),
            render: (name: string, record: TeamMember) => (
                <Link to={`${PATHS.MANAGER.TEAM.ROOT}/${record.id}`}>{name}</Link>
            ),
        },
        {
            title: "Nickname",
            dataIndex: "nickname",
            key: "nickname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Vị trí công việc",
            dataIndex: "jobPosition",
            key: "jobPosition",
            render: (jobPosition: string) => <Tag color="blue">{jobPosition}</Tag> || "Chưa cập nhật",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: TeamMember) => (
                <Space>
                    <Link to={`${PATHS.MANAGER.TEAM.EDIT}/${record.id}`}>
                        <Button type="primary">Edit</Button>
                    </Link>
                    <DeleteMember id={record.id || ""} memberName={record.name} />
                </Space>
            ),
        },
    ];

    return columns;
};

export { renderCloumns };
