import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resource, ResourcesState } from './types';


const initialState: ResourcesState = {
    loading: false,
    list: null,
};

const ResourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<ResourcesState>>) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: () => {},
});

export const ResourcesActions = ResourcesSlice.actions;
const ResourcesReducer = ResourcesSlice.reducer;
export default ResourcesReducer;
