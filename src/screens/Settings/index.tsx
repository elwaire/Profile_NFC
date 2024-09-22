import { Tabs } from "antd";
import "./styles.scss";
import { useMemo } from "react";
import HeaderSetting from "./components/HeaderSetting";
import InformationDetailBar from "./components/InformationDetailBar";
import NotificationWeb from "./components/NotificationWeb";

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
                label: "Information Detail Bar",
                children: <InformationDetailBar />,
            },
            {
                key: "3",
                label: "Notification Web",
                children: <NotificationWeb />,
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
