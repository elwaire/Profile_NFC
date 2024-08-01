import { ProjectPost, ProjectSection } from "~/core/types/Entities/Project";

export type ProjectsState = {
    loading: boolean;
    listProjects: ProjectPost[] | null;
    sections: ProjectSection[] ;
}