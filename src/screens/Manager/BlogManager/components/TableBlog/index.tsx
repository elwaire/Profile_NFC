import { Table } from "antd";
import { memo } from "react";
import { useAppSelector } from "~/core/hooks";
import { renderCloumns } from "./constant";
import { BlogPost } from "~/core/types";

interface TableBlogProps {
    fetchPosts: () => void;
    filteredBlogs: BlogPost[];
}

const TableBlog: React.FC<TableBlogProps> = ({ fetchPosts, filteredBlogs }) => {
    const { loading } = useAppSelector((state) => state.root.blogs);

    return (
        <div className="blog_post_list__container__wrapper">
            <Table
                columns={renderCloumns({ fetchPosts })}
                dataSource={filteredBlogs || []}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default memo(TableBlog);
