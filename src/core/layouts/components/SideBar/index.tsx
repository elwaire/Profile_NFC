import React, { memo, useCallback } from "react";

import { Menu, MenuProps } from "antd";
import Logo from "~/core/components/shared/Logo";
import { DataSideBar } from "./constants";
import "./styles.scss";

const SideBar: React.FC = () => {
    const onClick: MenuProps["onClick"] = useCallback(() => {}, []);

    return (
        <div className="side_bar__container">
            <div className="side_bar__container__logo">
                <h1>ADMIN</h1> (<Logo />)
            </div>
            <nav className="side_bar__container__nav_bar">
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={DataSideBar()}
                />
            </nav>
        </div>
    );
};

export default memo(SideBar);
