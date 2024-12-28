import { TableProps, Tag } from "antd";
import { Contact } from "~/core/types";
import DeleteContacts from "../DeleteContacts";
import DetailContact from "../DetailContact";

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
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <div className="flex gap-2">
                <DetailContact id={record.id} />
                <DeleteContacts id={record.id} />
            </div>
        ),
    },
];

export { renderColumns };

