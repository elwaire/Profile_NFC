import { Table } from "antd";
import { memo } from "react";
import { useAppSelector } from "~/core/hooks";
import { Resource } from "~/core/store/reducers/resources/types";
import { renderCloumns } from "./constant";

type TableResourcesProps = {
    fetchPosts: () => void;
    filteredProjects: Resource[];
};

const TableResources: React.FC<TableResourcesProps> = ({ filteredProjects }) => {
    const { loading } = useAppSelector((state) => state.root.resources);

    return (
        <div>
            <Table columns={renderCloumns() as any} dataSource={filteredProjects || []} rowKey="id" loading={loading} />
        </div>
    );
};

export default memo(TableResources);
