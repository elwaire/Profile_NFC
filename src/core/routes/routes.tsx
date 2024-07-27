import { createBrowserRouter } from "react-router-dom";

import PATHS from "../constants/path";
import { MainLayout } from "../layouts";
import React from "react";

const HomeScreen = React.lazy(() => import("~/screens/Home"));

const SignInScreen = React.lazy(() => import("~/screens/SignIn"));

// Manager
const BannerManager = React.lazy(() => import("~/screens/Manager/BannerManager"));

const BlogManager = React.lazy(() => import("~/screens/Manager/BlogManager"));
const CreateBlog = React.lazy(() => import("~/screens/Manager/BlogManager/CreateBlog"));

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
            // Manager
            {
                path: PATHS.MANAGER.BANNER,
                element: <BannerManager />,
            },
            {
                path: PATHS.MANAGER.BLOG.ROOT,
                element: <BlogManager />,
            },
            {
                path: PATHS.MANAGER.BLOG.CREATE,
                element: <CreateBlog />,
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
            {
                path: PATHS.SIGN_IN,
                element: <SignInScreen />,
            },
        ],
    },
]);

export default router;
