import { Table } from "antd";
import { memo } from "react";
import { useAppSelector } from "~/core/hooks";
import { renderCloumns } from "./constant";
import { ProjectPost } from "~/core/types/Entities/Project";

interface TableProjectProps {
    fetchPosts: () => void;
    filteredProjects: ProjectPost[];
}

const TableProject: React.FC<TableProjectProps> = ({ fetchPosts, filteredProjects }) => {
    const { loading } = useAppSelector((state) => state.root.blogs);

    return (
        <div className="projects_post_list__container__wrapper">
            <Table
                columns={renderCloumns({ fetchPosts }) as any}
                dataSource={filteredProjects || []}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default memo(TableProject);
