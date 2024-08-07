import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from './types';


const initialState: SettingsState = {
    loading: false,
    footer: {
        descriptionGetInTouch: '',
        networks: [],
    },
};

const SettingsSlice = createSlice({
    name: 'Settings',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<SettingsState>>) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: () => {},
});

export const SettingsActions = SettingsSlice.actions;
const SettingsReducer = SettingsSlice.reducer;
export default SettingsReducer;
