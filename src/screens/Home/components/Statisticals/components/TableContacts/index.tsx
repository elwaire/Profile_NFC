import { Table } from "antd";
import { memo } from "react";
import { Contact } from "~/core/types";
import { renderColumns } from "./constants";

type TableContactsProps = {
    data: Contact[];
    loading: boolean;
};

const TableContacts: React.FC<TableContactsProps> = ({ data, loading }) => {

    return (
        <div className="">
            <Table columns={renderColumns} dataSource={data} loading={loading} />
        </div>
    );
};

export default memo(TableContacts);
