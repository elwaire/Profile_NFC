import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import PATHS from "~/core/constants/path";
import { BlogPost } from "~/core/types";
import { formatTime } from "~/core/utils";
import { EditOutlined } from "@ant-design/icons";
import DeleteProject from "./components/DeleteProject";
import { ProjectPost } from "~/core/types/Entities/Project";

interface renderCloumnsProps {
    fetchPosts: () => void;
}

const renderCloumns = ({ fetchPosts }: renderCloumnsProps) => {
    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (title: string, record: ProjectPost) => (
                <Link to={`${PATHS.MANAGER.PROJECT.ROOT}/${record.id}`}>{title}</Link>
            ),
        },
        {
            title: "Sections",
            dataIndex: "sections",
            key: "sections",
            render: (sections: Array<{ imageUrl: string; content: string }>) => sections.length,
        },
        {
            title: "Created At",
            dataIndex: "timeCreated",
            key: "timeCreated",
            render: (time: string) => <p>{formatTime(time)}</p>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: BlogPost) => (
                <Space size="middle">
                    <Link to={`${PATHS.MANAGER.PROJECT.EDIT}/${record.id}`}>
                        <Button icon={<EditOutlined />}>Edit</Button>
                    </Link>
                    <DeleteProject refetchPosts={fetchPosts} data={record as any} />
                </Space>
            ),
        },
    ];

    return columns;
};

export { renderCloumns };
