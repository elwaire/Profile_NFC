export interface ProjectPost {
    id: string;
    title: string;
    sections: ProjectSection[];
    timeCreated: string;
}

export interface ProjectSection {
    key: string;
    images: {
        uid: any;
        url: string;
    }[];
    contents: string[];
}