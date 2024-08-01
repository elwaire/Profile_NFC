import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Title } from "~/core/components";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { getDataFirebase } from "~/core/services";
import { ProjectsActions } from "~/core/store";
import { ProjectPost } from "~/core/types/Entities/Project";
import HeadProject from "./components/HeadProject";
import TableProject from "./components/TableProject";
import "./styles.scss";

const ProjectsManager: React.FC = () => {
    const dispatch = useAppDispatch();
    const { listProjects } = useAppSelector((state) => state.root.projects);
    const [valueSearch, setValueSearch] = useState<string>("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        dispatch(ProjectsActions.update({ loading: true }));
        try {
            const fetchedPosts = (await getDataFirebase("projects")) as ProjectPost[];
            dispatch(ProjectsActions.update({ listProjects: fetchedPosts.reverse() }));
        } catch (error) {
            console.error("Error fetching posts:", error);
            message.error("Failed to fetch projects posts");
        } finally {
            dispatch(ProjectsActions.update({ loading: false }));
        }
    };

    const handleSearch = useCallback((value: string) => {
        setValueSearch(value);
    }, []);

    const filteredProjects = listProjects?.filter((project) =>
        project.title.toLowerCase().includes(valueSearch.toLowerCase()),
    );

    return (
        <div className="projects_post_list__container">
            <Title title="Blog Manager" />
            <HeadProject handleSearch={handleSearch} />
            <TableProject fetchPosts={fetchPosts} filteredProjects={filteredProjects || []} />
        </div>
    );
};

export default ProjectsManager;
