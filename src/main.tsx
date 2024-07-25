import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";

import { persistor, store } from "~/core/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import i18next from "i18next";

import global_en from "~/core/translations/en/global.json";
import global_vi from "~/core/translations/vi/global.json";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from "antd";

i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
        en: {
            global: global_en,
        },
        vi: {
            global: global_vi,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <React.Fragment>
        <Provider store={store}>
            <PersistGate loading={"...loading"} persistor={persistor}>
                <React.Suspense fallback={<>loading...</>}>
                    <I18nextProvider i18n={i18next}>
                        <ConfigProvider>
                            <App />
                        </ConfigProvider>
                    </I18nextProvider>
                </React.Suspense>
            </PersistGate>
        </Provider>
    </React.Fragment>,
    // </React.StrictMode>,
);
