import { BlogPost, BlogSection } from "~/core/types";

export type BlogsState = {
    loading: boolean;
    listBlogs: BlogPost[] | null;
    sections: BlogSection[] ;
}