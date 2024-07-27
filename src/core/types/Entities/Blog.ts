export interface BlogPost {
    id: string;
    title: string;
    sections: Array<{ imageUrl: string; content: string }>;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}

export interface BlogSection {
    key: string;
    images: string[];
    contents: string[];
}