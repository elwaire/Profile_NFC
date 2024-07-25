import { memo } from "react";
import Account from "./components/Account";
import "./styles.scss";

const Header: React.FC = () => {
    return (
        <header className="header__container">
            <Account />
        </header>
    );
};

export default memo(Header);
