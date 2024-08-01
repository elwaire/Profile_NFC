import { Button, Flex } from "antd";
import SearchPost from "./components/SearchPost";
import { Link } from "react-router-dom";
import PATHS from "~/core/constants/path";
import { memo } from "react";

interface HeadProjectProps {
    handleSearch: (value: string) => void;
}

const HeadProject: React.FC<HeadProjectProps> = ({ handleSearch }) => {
    return (
        <Flex>
            <SearchPost onSearch={handleSearch} />
            <Link to={PATHS.MANAGER.PROJECT.CREATE} className="projects_post_list__container__create">
                <Button type="primary">Create</Button>
            </Link>
        </Flex>
    );
};

export default memo(HeadProject);
