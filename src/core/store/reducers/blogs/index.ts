import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogsState } from './types';


const initialState: BlogsState = {
    loading: false,
    listBlogs: null,
    sections: [{ key: "0", images: [], contents: [""] }],
};

const BlogsSlice = createSlice({
    name: 'Blogs',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<BlogsState>>) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: () => {},
});

export const BlogsActions = BlogsSlice.actions;
const BlogsReducer = BlogsSlice.reducer;
export default BlogsReducer;
