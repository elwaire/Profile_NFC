import { Button, message } from "antd";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Title } from "~/core/components";
import { db } from "~/core/configs/firebase";
import { HeaderSettings } from "~/core/types";
import ListNavLink from "./components/ListNavLink";
import UploadAvatar from "./components/UploadAvatar";
import "./styles.scss";

const HEADER_DOC_ID = "header";

const HeaderSetting: React.FC = () => {
    const [settings, setSettings] = useState<HeaderSettings>({ logoUrl: "", logoPath: "", navLinks: [] });

    const fetchHeaderSettings = useCallback(async () => {
        const docRef = doc(db, "settings", HEADER_DOC_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setSettings(docSnap.data() as HeaderSettings);
        }
    }, []);

    useEffect(() => {
        fetchHeaderSettings();
    }, [fetchHeaderSettings]);

    const handleSaveSettings = async () => {
        const docRef = doc(db, "settings", HEADER_DOC_ID);
        try {
            await setDoc(docRef, settings);
            message.success("Header settings saved successfully");
        } catch (error) {
            message.error("Failed to save header settings");
        }
    };

    return (
        <div className="wrapper__tab__settings header_settings__container">
            <Title title="Header Settings" />

            <UploadAvatar setSettings={setSettings} settings={settings} />
            <ListNavLink settings={settings} setSettings={setSettings} />

            <Button onClick={handleSaveSettings} style={{ marginTop: 16 }}>
                Save Settings
            </Button>
        </div>
    );
};

export default memo(HeaderSetting);
