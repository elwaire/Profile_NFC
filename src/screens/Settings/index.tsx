import { Tabs } from "antd";
import "./styles.scss";
import { useMemo } from "react";
import HeaderSetting from "./components/HeaderSetting";

const SettingsScreen: React.FC = () => {
    const items = useMemo(() => {
        return [
            {
                key: "1",
                label: "Header Setting",
                children: <HeaderSetting />,
            },
            {
                key: "2",
                label: "Tab 2",
                children: "Content of Tab 2",
            },
            {
                key: "3",
                label: "Tab 3",
                children: "Content of Tab 3",
            },
        ];
    }, []);

    return (
        <div className="settings_screen__container">
            <Tabs
                tabPosition={"left"}
                items={items.map((item) => {
                    return {
                        label: item.label,
                        key: item.key,
                        children: item.children,
                    };
                })}
            />
        </div>
    );
};

export default SettingsScreen;
