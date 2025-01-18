import { Button } from "antd";
import { Link } from "react-router-dom";
import PATHS from "~/core/constants/path";
import { Resource } from "~/core/store/reducers/resources/types";

const renderCloumns = () => {
    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <span className="font-medium">{text}</span>,
        },
        {
            title: "Images",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (text: string) => (
                <div>
                    <img src={text} alt="resource" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                </div>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 120,
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
            ellipsis: true,
        },
        {
            title: "Button Label",
            dataIndex: "buttonLabel",
            key: "buttonLabel",
            width: 150,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Actions",
            key: "actions",
            width: 120,
            render: (record: Resource) => (
                <Link to={`${PATHS.MANAGER.RESOURCE.ROOT}/${record?.id}`}>
                    <Button type="primary">Edit</Button>
                </Link>
            ),
        },
    ];

    return columns;
};

export { renderCloumns };
