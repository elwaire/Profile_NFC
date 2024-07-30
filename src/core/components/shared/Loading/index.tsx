import { Spin } from "antd";
import "./styles.scss";

const Loading: React.FC = () => {
    return (
        <div className="loading__container">
            <Spin size="large" />
        </div>
    );
};

export default Loading;
