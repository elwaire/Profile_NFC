import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamState } from './types';


const initialState: TeamState = {
    loading: false,
    listTeam: [],
    totalMembers: 0,
    currentPage: 1,
};

const TeamSlice = createSlice({
    name: 'Team',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<TeamState>>) => {
            return { ...state, ...action.payload };
        },

    },
    extraReducers: () => {},
});

export const TeamActions = TeamSlice.actions;
const TeamReducer = TeamSlice.reducer;
export default TeamReducer;
