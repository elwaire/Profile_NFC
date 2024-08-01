import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AboutUsState } from './types';


const initialState: AboutUsState = {
    loading: false,
    data: null,
};

const AboutUsSlice = createSlice({
    name: 'AboutUs',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<AboutUsState>>) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: () => {},
});

export const AboutUsActions = AboutUsSlice.actions;
const AboutUsReducer = AboutUsSlice.reducer;
export default AboutUsReducer;
