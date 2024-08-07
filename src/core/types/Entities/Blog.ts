export interface BlogPost {
    id: string;
    title: string;
    tags: string;
    sections: BlogSection[];
    timeCreated: string;
}

export interface BlogSection {
    key: string;
    images: {
        uid: any;
        url: string;
    }[];
    contents: string[];
}