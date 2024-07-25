import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";

import "./styles.scss";

type BackPageProps = {
    type?: "detail" | "default";
    background?: "primary" | "secondary";
};

const BackPage: React.FC<BackPageProps> = ({ type = "default", background = "primary" }) => {
    const naviagte = useNavigate();

    const handleBack = () => {
        naviagte(-1);
    };

    return (
        <button
            onClick={handleBack}
            className={`group__center ${type === "detail" && "back_page__detail"} bg-${background} ${
                background === "primary" ? "text-secondary" : "text-white"
            }`}
        >
            {type === "default" ? <ArrowLeftOutlined /> : <CloseOutlined />}
        </button>
    );
};

export default BackPage;
