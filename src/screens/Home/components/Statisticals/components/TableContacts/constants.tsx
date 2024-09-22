import { TableProps, Tag } from "antd";
import { Contact } from "~/core/types";

const renderColumns: TableProps<Contact>["columns"] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (email) => <Tag color="blue">{email}</Tag>,
    },
    {
        title: "Company",
        dataIndex: "company",
        key: "company",
    },
    {
        title: "Detail",
        key: "details",
        dataIndex: "details",
        render: (detail) => <p>{detail}</p>,
    },
];

export { renderColumns };
