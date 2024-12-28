import { Avatar, Dropdown, MenuProps } from "antd";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "~/core/hooks";

import "./styles.scss";
import { AuthActions } from "~/core/store";
import { useNavigate } from "react-router-dom";
import PATHS from "~/core/constants/path";

const Account: React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => {
        return state.root.auth.user;
    });

    const items: MenuProps["items"] = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: "0",
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: "1",
        },
        {
            type: "divider",
        },
        {
            label: "Log out",
            key: "3",
            onClick: () => {
                dispatch(AuthActions.logout());
                navigate(PATHS.SIGN_IN);
            },
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <div className="account__container">
                <div className="account__container__group">
                    <h1>{user?.displayName || "Admin"}</h1>
                    <p>{user?.email || "-------"}</p>
                </div>
                <Avatar src="https://i.pinimg.com/736x/9e/cb/7d/9ecb7df08d34ff2c15b339605127c7dd.jpg" />
            </div>
        </Dropdown>
    );
};

export default memo(Account);
