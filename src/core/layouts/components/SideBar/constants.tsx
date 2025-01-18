import { EditOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import PATHS from "~/core/constants/path";

type MenuItem = Required<MenuProps>["items"][number];

export const DataSideBar = () => {
    const navigate = useNavigate();

    const items: MenuItem[] = [
        {
            type: "divider",
        },
        { key: "home", label: "Dashboard", onClick: () => navigate(PATHS.HOME) },
        // { key: "home-forum", label: "Home Forum Manager", onClick: () => navigate(PATHS.MANAGER.HOME_FORUM) },
        {
            key: "sub1",
            label: "Manage information",
            icon: <EditOutlined />,
            children: [
                {
                    key: "g1",
                    label: "Display information",
                    type: "group",
                    children: [
                        { key: "1", label: "Banner", onClick: () => navigate(PATHS.MANAGER.BANNER) },
                        { key: "2", label: "About us", onClick: () => navigate(PATHS.MANAGER.ABOUT_US) },
                    ],
                },
                {
                    key: "g2",
                    label: "Display post",
                    type: "group",
                    children: [
                        { key: "3", label: "Blog", onClick: () => navigate(PATHS.MANAGER.BLOG.ROOT) },
                        { key: "4", label: "Projects", onClick: () => navigate(PATHS.MANAGER.PROJECT.ROOT) },
                        { key: "5", label: "Resources", onClick: () => navigate(PATHS.MANAGER.RESOURCE.ROOT) },
                    ],
                },
            ],
        },

        {
            type: "divider",
        },

        {
            key: "grp",
            label: "More",
            type: "group",
            children: [
                { key: "13", label: "Team Manager", onClick: () => navigate(PATHS.MANAGER.TEAM.ROOT) },
                { key: "14", label: "Images Manager", onClick: () => navigate(PATHS.MANAGER.IMAGES) },
                { key: "15", label: "Settings", onClick: () => navigate(PATHS.SETTINGS) },
            ],
        },
    ];

    return items;
};
