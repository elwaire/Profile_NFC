
export type ResourcesState = {
    loading: boolean;
    list: Resource[] | null;
}

export type Resource = {
    id?: string;
    title: string;
    note: string;
    buttonLabel: string;
    link: string;
    category: string;
    imageUrl?: string;
}