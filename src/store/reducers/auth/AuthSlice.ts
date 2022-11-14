import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import {login} from "./ActionCreators";

const isAuth = localStorage.getItem('isAuth') === 'true';


interface AuthState {
    isAuth: boolean | null,
    user: IUser,
    isLoading: boolean,
    error: string,
}

const initialState: AuthState = {
    isAuth: isAuth,
    user: {} as IUser,
    isLoading: false,
    error: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false;
            state.user = {} as IUser;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state, action:PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
            })


    }


})

export default authSlice.reducer;
