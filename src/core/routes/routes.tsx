import { createBrowserRouter } from "react-router-dom";

import PATHS from "../constants/path";
import { MainLayout } from "../layouts";
import React from "react";

const HomeScreen = React.lazy(() => import("~/screens/Home"));
const HomeForumManagerScreen = React.lazy(() => import("~/screens/Manager/HomeForumManager"));

const SignInScreen = React.lazy(() => import("~/screens/SignIn"));

// Manager
const BannerManager = React.lazy(() => import("~/screens/Manager/BannerManager"));

const BlogManager = React.lazy(() => import("~/screens/Manager/BlogManager"));
const CreateBlog = React.lazy(() => import("~/screens/Manager/BlogManager/CreateBlog"));
const DetailBlog = React.lazy(() => import("~/screens/Manager/BlogManager/DetailBlog"));

const ProjectsManager = React.lazy(() => import("~/screens/Manager/ProjectsManager"));
const CreateProject = React.lazy(() => import("~/screens/Manager/ProjectsManager/CreateProject"));
const DetailProject = React.lazy(() => import("~/screens/Manager/ProjectsManager/DetailProject"));

const AboutUsManager = React.lazy(() => import("~/screens/Manager/AboutUsManager"));

const TeamManager = React.lazy(() => import("~/screens/Manager/TeamManager"));
const CreateMember = React.lazy(() => import("~/screens/Manager/TeamManager/CreateMember"));
const DetailMember = React.lazy(() => import("~/screens/Manager/TeamManager/DetailMember"));

const ResourceManager = React.lazy(() => import("~/screens/Manager/ResourceManager"));
const CreateResources = React.lazy(() => import("~/screens/Manager/ResourceManager/CreateResources"));
const EditResources = React.lazy(() => import("~/screens/Manager/ResourceManager/EditResources"));

const ImageManager = React.lazy(() => import("~/screens/Manager/ImageManager"));
const SettingsScreen = React.lazy(() => import("~/screens/Settings"));

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
                path: `${PATHS.MANAGER.BLOG.ROOT}/:id`,
                element: <DetailBlog />,
            },
            {
                path: PATHS.MANAGER.BLOG.CREATE,
                element: <CreateBlog />,
            },
            {
                path: `${PATHS.MANAGER.BLOG.EDIT}/:id`,
                element: <CreateBlog />,
            },
            {
                path: PATHS.MANAGER.ABOUT_US,
                element: <AboutUsManager />,
            },
            {
                path: PATHS.MANAGER.PROJECT.ROOT,
                element: <ProjectsManager />,
            },
            {
                path: `${PATHS.MANAGER.PROJECT.ROOT}/:id`,
                element: <DetailProject />,
            },
            {
                path: PATHS.MANAGER.PROJECT.CREATE,
                element: <CreateProject />,
            },
            {
                path: `${PATHS.MANAGER.PROJECT.EDIT}/:id`,
                element: <CreateProject />,
            },
            {
                path: PATHS.MANAGER.TEAM.ROOT,
                element: <TeamManager />,
            },
            {
                path: PATHS.MANAGER.TEAM.CREATE,
                element: <CreateMember />,
            },
            {
                path: `${PATHS.MANAGER.TEAM.ROOT}/:id`,
                element: <DetailMember />,
            },
            {
                path: `${PATHS.MANAGER.TEAM.EDIT}/:id`,
                element: <CreateMember />,
            },
            {
                path: PATHS.MANAGER.RESOURCE.ROOT,
                element: <ResourceManager />,
            },
            {
                path: PATHS.MANAGER.RESOURCE.CREATE,
                element: <CreateResources />,
            },
            {
                path: `${PATHS.MANAGER.RESOURCE.ROOT}/:id`,
                element: <EditResources />,
            },
            {
                path: PATHS.MANAGER.IMAGES,
                element: <ImageManager />,
            },
            {
                path: PATHS.SETTINGS,
                element: <SettingsScreen />,
            },
            {
                path: PATHS.MANAGER.HOME_FORUM,
                element: <HomeForumManagerScreen />,
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
