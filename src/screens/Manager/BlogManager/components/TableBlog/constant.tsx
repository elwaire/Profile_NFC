import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import PATHS from "~/core/constants/path";
import { BlogPost } from "~/core/types";
import { formatTime } from "~/core/utils";
import { EditOutlined } from "@ant-design/icons";
import DeletePost from "./components/DeletePost";

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
            render: (title: string, record: BlogPost) => (
                <Link to={`${PATHS.MANAGER.BLOG.ROOT}/${record.id}`}>{title}</Link>
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
                    <Link to={`${PATHS.MANAGER.BLOG.EDIT}/${record.id}`}>
                        <Button icon={<EditOutlined />}>Edit</Button>
                    </Link>
                    <DeletePost refetchPosts={fetchPosts} data={record} />
                </Space>
            ),
        },
    ];

    return columns;
};

export { renderCloumns };
