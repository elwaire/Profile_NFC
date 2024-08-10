import { memo } from "react";
import "./styles.scss";

const Statisticals: React.FC = () => {
    return (
        <div className="statisticals__container">
            <img src="https://i.pinimg.com/736x/80/4a/46/804a460b1d8e31e564b419ff1bd60e46.jpg" alt="" />
        </div>
    );
};

export default memo(Statisticals);
