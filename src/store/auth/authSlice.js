import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated','not-authenticated',
        user: {},
        errorMessage: undefined,
        statusCode: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
            state.statusCode = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
            state.statusCode = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
            state.statusCode = undefined;
        },
        onRegister: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = undefined;
            state.statusCode = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
            state.statusCode = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onRegister, clearErrorMessage } = authSlice.actions;