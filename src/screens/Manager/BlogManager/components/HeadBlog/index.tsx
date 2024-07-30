import { Button, Flex } from "antd";
import SearchPost from "./components/SearchPost";
import { Link } from "react-router-dom";
import PATHS from "~/core/constants/path";
import { memo } from "react";

interface HeadBlogProps {
    handleSearch: (value: string) => void;
}

const HeadBlog: React.FC<HeadBlogProps> = ({ handleSearch }) => {
    return (
        <Flex>
            <SearchPost onSearch={handleSearch} />
            <Link to={PATHS.MANAGER.BLOG.CREATE} className="blog_post_list__container__create">
                <Button type="primary">Create</Button>
            </Link>
        </Flex>
    );
};

export default memo(HeadBlog);
