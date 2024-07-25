import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';
import { signOut } from 'firebase/auth';
import { auth } from '~/core/configs/firebase';


const initialState: AuthState = {
    loading: false,
    user: null
};

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<AuthState>>) => {
            return { ...state, ...action.payload };
        },
        logout: (state) => {
            signOut(auth);
            return { ...state, user: null };
        }
    },
    extraReducers: () => {
     
    },
});

export const AuthActions = AuthSlice.actions;
const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
