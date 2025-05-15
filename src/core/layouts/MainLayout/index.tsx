import { Outlet } from "react-router-dom";
import "./styles.scss";

const MainLayout: React.FC = () => {
    return (
        <div className="main_layout__container">
            <div className="flex-1 max-w-[760px] bg-yellow-200">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
