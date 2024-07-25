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

        {
            key: "sub1",
            label: "Content Management",
            icon: <EditOutlined />,
            children: [
                {
                    key: "g1",
                    label: "Home",
                    type: "group",
                    children: [
                        { key: "1", label: "Banner", onClick: () => navigate(PATHS.MANAGER.BANNER) },
                        { key: "2", label: "Option 2" },
                    ],
                },
                {
                    key: "g2",
                    label: "Item 2",
                    type: "group",
                    children: [
                        { key: "3", label: "Option 3" },
                        { key: "4", label: "Option 4" },
                    ],
                },
            ],
        },

        {
            type: "divider",
        },

        {
            key: "grp",
            label: "Group",
            type: "group",
            children: [
                { key: "13", label: "Option 13" },
                { key: "14", label: "Option 14" },
            ],
        },
    ];

    return items;
};
