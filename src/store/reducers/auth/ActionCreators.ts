import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import axios from "axios";
import {AppDispatch} from "../../index";
import {authSlice} from "./AuthSlice";
import UserService from "../../../api/UserService";



export const login = createAsyncThunk(
    'auth/login',
    async (user: IUser, thunkAPI) => {
        try {
            const response = await UserService.getUsers();
            const mockUser = response.data.find((u: IUser) => user.username === u.username && user.password === u.password);
            console.log(mockUser);
            if (mockUser) {
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('username', user.username);
                return mockUser;
            } else {
                return thunkAPI.rejectWithValue('Wrong username or password');
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)


export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('username');
    localStorage.removeItem('isAuth');
    dispatch(authSlice.actions.logout());
}

// export default {
//     login,
//     logout
// }



