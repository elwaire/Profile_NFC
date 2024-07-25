import { Link } from "react-router-dom";
import SVGS from "~/assets/svgs";

import "./styles.scss";

const Logo: React.FC = () => {
    return (
        <Link to="/" className="logo__container">
            <img src={SVGS.Logo} alt="" />
        </Link>
    );
};

export default Logo;
