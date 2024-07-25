import { createSlice } from '@reduxjs/toolkit';
import { ProjectsState } from './types';


const initialState: ProjectsState = {
    loading: false,
};

const ProjectsSlice = createSlice({
    name: 'Projects',
    initialState,
    reducers: {
    },
    extraReducers: () => {},
});

export const ProjectsActions = ProjectsSlice.actions;
const ProjectsReducer = ProjectsSlice.reducer;
export default ProjectsReducer;
