import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectsState } from './types';


const initialState: ProjectsState = {
    loading: false,
    listProjects: null,
    sections: [{ key: "0", images: [], contents: [""] }],
};

const ProjectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<ProjectsState>>) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: () => {},
});

export const ProjectsActions = ProjectsSlice.actions;
const ProjectsReducer = ProjectsSlice.reducer;
export default ProjectsReducer;
