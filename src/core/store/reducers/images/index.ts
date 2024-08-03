import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImagesState } from './types';


const initialState: ImagesState = {
    loading: false,
    list: [],
};

const ImagesSlice = createSlice({
    name: 'Images',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<ImagesState>>) => {
            return { ...state, ...action.payload };
        },
     
    },
    extraReducers: () => {
     
    },
});

export const ImagesActions = ImagesSlice.actions;
const ImagesReducer = ImagesSlice.reducer;
export default ImagesReducer;
