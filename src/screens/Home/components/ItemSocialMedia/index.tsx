import { memo } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

type dataLink = {
    image: string;
    title: string;
    url: string;
};

const ItemSocialMedia: React.FC<dataLink> = (dataLink) => {
    return (
        <Link to={dataLink.url || ""} className="item_social_media__container">
            <img src={dataLink.image || ""} alt={dataLink.title || ""} />
            <div className="item_social_media__container__content">
                <p>{dataLink.title || ""}</p>
            </div>
        </Link>
    );
};

export default memo(ItemSocialMedia);
