import { Input } from "antd";
import { memo } from "react";

interface SearchPostProps {
    onSearch: (value: string) => void;
}

const SearchPost: React.FC<SearchPostProps> = ({ onSearch }) => {
    return <Input.Search placeholder="Search post" onSearch={onSearch} />;
};

export default memo(SearchPost);
