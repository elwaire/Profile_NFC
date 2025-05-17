import { memo } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const ItemSocialMedia: React.FC = () => {
    return (
        <Link to={""} className="item_social_media__container">
            <img src="https://i.pinimg.com/736x/e5/69/d8/e569d8ebf248c5f40fd180aaf2fbb48e.jpg" alt="" />
            <div className="item_social_media__container__content">
                <p>Facebook</p>
            </div>
        </Link>
    );
};

export default memo(ItemSocialMedia);
