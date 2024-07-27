import { Button, message, Space, Table } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Title } from "~/core/components";
import PATHS from "~/core/constants/path";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { getDataFirebase } from "~/core/services";
import { BlogsActions } from "~/core/store";
import { BlogPost } from "~/core/types";
import DeletePost from "./components/DeletePost";
import EditBlog from "./components/EditBlog";
import "./styles.scss";

const BlogManager: React.FC = () => {
    const dispatch = useAppDispatch();
    const listBlogs = useAppSelector((state) => {
        return state.root.blogs.listBlogs;
    });
    const loading = useAppSelector((state) => {
        return state.root.blogs.loading;
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        dispatch(BlogsActions.update({ loading: true }));
        try {
            const fetchedPosts = (await getDataFirebase("blogs")) as BlogPost[];
            dispatch(BlogsActions.update({ listBlogs: fetchedPosts }));
        } catch (error) {
            console.error("Error fetching posts:", error);
            message.error("Failed to fetch blog posts");
        } finally {
            dispatch(BlogsActions.update({ loading: false }));
        }
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Sections",
            dataIndex: "sections",
            key: "sections",
            render: (sections: Array<{ imageUrl: string; content: string }>) => sections.length,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: any) => createdAt,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: BlogPost) => (
                <Space size="middle">
                    <EditBlog record={record} />
                    <DeletePost refetchPosts={fetchPosts} record={record} />
                </Space>
            ),
        },
    ];
    return (
        <div className="blog_post_list__container">
            <Title title="Blog Posts" />
            <Link to={PATHS.MANAGER.BLOG.CREATE} className="blog_post_list__container__create">
                <Button type="primary">Create</Button>
            </Link>
            <div className="blog_post_list__container__wrapper">
                <Table columns={columns} dataSource={listBlogs || []} rowKey="id" loading={loading} />
            </div>
        </div>
    );
};

export default BlogManager;
