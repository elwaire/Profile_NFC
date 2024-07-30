import { memo } from "react";
import BackPage from "../BackPage";
import "./styles.scss";

type TitleProps = {
    title: string;
    backPage?: boolean;
};

const Title: React.FC<TitleProps> = ({ backPage = false, ...props }) => {
    return (
        <h1 className="title__container">
            {backPage && <BackPage />}
            <span>{props.title}</span>
        </h1>
    );
};

export default memo(Title);
