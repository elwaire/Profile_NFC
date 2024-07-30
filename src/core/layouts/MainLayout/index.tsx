import { Outlet, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

import "./styles.scss";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/core/configs/firebase";
import PATHS from "~/core/constants/path";

const MainLayout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate(PATHS.SIGN_IN);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="main_layout__container">
            <SideBar />
            <div className="flex-1">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
