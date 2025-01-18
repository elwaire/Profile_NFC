import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Title } from "~/core/components";
import PATHS from "~/core/constants/path";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { getDataFirebase } from "~/core/services";
import { ResourcesActions } from "~/core/store";
import { Resource } from "~/core/store/reducers/resources/types";
import TableResources from "./components/TableResources";
import "./styles.scss";

const ResourceManager: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list } = useAppSelector((state) => state.root.resources);
    const [valueSearch] = useState<string>("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        dispatch(ResourcesActions.update({ loading: true }));
        try {
            const fetchedPosts = (await getDataFirebase("resources")) as Resource[];
            dispatch(ResourcesActions.update({ list: fetchedPosts.reverse() }));
        } catch (error) {
            console.error("Error fetching posts:", error);
            message.error("Failed to fetch resources posts");
        } finally {
            dispatch(ResourcesActions.update({ loading: false }));
        }
    };

    // const handleSearch = useCallback((value: string) => {
    //     setValueSearch(value);
    // }, []);

    const filteredProjects = list?.filter((project) => project.title.toLowerCase().includes(valueSearch.toLowerCase()));

    return (
        <div className="resources__container">
            <Title title="Resources Manager" />
            <Link to={PATHS.MANAGER.RESOURCE.CREATE}>
                <Button>Add new resource</Button>
            </Link>
            <TableResources fetchPosts={fetchPosts} filteredProjects={filteredProjects || []} />
        </div>
    );
};

export default ResourceManager;
