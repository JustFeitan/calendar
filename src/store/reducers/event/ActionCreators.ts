import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import UserService from "../../../api/UserService";
import {IEvent} from "../../../models/IEvent";

export const fetchGuests = createAsyncThunk(
    'event/guests',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.getUsers();
            return response.data as IUser[];
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (event: IEvent, thunkAPI) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            localStorage.setItem('events', JSON.stringify(json));
            return json;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async (username: string, thunkAPI) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            return json.filter(ev => ev.author === username || ev.guest === username);
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
