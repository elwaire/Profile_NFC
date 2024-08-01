import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Title } from "~/core/components";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { getDataFirebase } from "~/core/services";
import { BlogsActions } from "~/core/store";
import { BlogPost } from "~/core/types";
import HeadBlog from "./components/HeadBlog";
import TableBlog from "./components/TableBlog";
import "./styles.scss";

const BlogManager: React.FC = () => {
    const dispatch = useAppDispatch();
    const { listBlogs } = useAppSelector((state) => state.root.blogs);
    const [valueSearch, setValueSearch] = useState<string>("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        dispatch(BlogsActions.update({ loading: true }));
        try {
            const fetchedPosts = (await getDataFirebase("blogs")) as BlogPost[];
            dispatch(BlogsActions.update({ listBlogs: fetchedPosts.reverse() }));
        } catch (error) {
            console.error("Error fetching posts:", error);
            message.error("Failed to fetch blog posts");
        } finally {
            dispatch(BlogsActions.update({ loading: false }));
        }
    };

    const handleSearch = useCallback((value: string) => {
        setValueSearch(value);
    }, []);

    const filteredBlogs = listBlogs?.filter((blog) => blog.title.toLowerCase().includes(valueSearch.toLowerCase()));

    return (
        <div className="blog_post_list__container">
            <Title title="Blog Manager" />
            <HeadBlog handleSearch={handleSearch} />
            <TableBlog fetchPosts={fetchPosts} filteredBlogs={filteredBlogs || []} />
        </div>
    );
};

export default BlogManager;
