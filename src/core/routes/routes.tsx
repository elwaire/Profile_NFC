import { createBrowserRouter } from "react-router-dom";

import PATHS from "../constants/path";
import { MainLayout } from "../layouts";
import React from "react";

const HomeScreen = React.lazy(() => import("~/screens/Home"));

const NotFoundScreen = React.lazy(() => import("~/screens/NotFound"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: PATHS.HOME,
                element: <HomeScreen />,
            },

            {
                path: "*",
                element: <NotFoundScreen />,
            },
        ],
    },
    {
        path: "/",
        children: [
            // {
            //     path: PATHS.SIGN_IN,
            //     element: <SignInScreen />,
            // },
        ],
    },
]);

export default router;
