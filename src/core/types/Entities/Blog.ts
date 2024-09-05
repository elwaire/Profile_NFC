export interface BlogPost {
    id: string;
    title: string;
    tags: 'blog' | 'learn-about' | 'work' | 'introduce' | 'goals' | 'life' ;
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