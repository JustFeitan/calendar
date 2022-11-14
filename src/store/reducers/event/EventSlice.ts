import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {createEvent, fetchEvents, fetchGuests} from "./ActionCreators";

interface EventState {
    guests: IUser[];
    events: IEvent[];
    isLoading: boolean;
    error: string
}

const initialState: EventState = {
    guests: [],
    events: [],
    isLoading: false,
    error: '',
}

export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(fetchGuests.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                    state.guests = action.payload;
                    state.isLoading = false
                })
                .addCase(fetchGuests.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fetchGuests.rejected, (state, action) => {
                    state.error = action.payload as string;
                    state.isLoading = false;
                })

                .addCase(createEvent.fulfilled, (state, action: PayloadAction<IEvent[]>) => {
                    state.events = action.payload;
                    state.isLoading = false;
                })
                .addCase(createEvent.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(createEvent.rejected, (state, action) => {
                    state.error = action.payload as string;
                    state.isLoading = false;
                })

                .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<IEvent[]>) => {
                    state.events = action.payload;
                    state.isLoading = false;
                })
                .addCase(fetchEvents.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fetchEvents.rejected, (state, action) => {
                    state.error = action.payload as string;
                    state.isLoading = false;
                })
        }

})

export default EventSlice.reducer;
//
// [fetchGuests.fulfilled.type]
// :
// (state, action: PayloadAction<IUser[]>) => {
//     state.guests = action.payload;
//     state.isLoading = false
// },
//     [fetchGuests.pending.type]
// :
// (state) => {
//     state.isLoading = true;
// },
//     [fetchGuests.rejected.type]
// :
// (state, action: PayloadAction<string>) => {
//     state.isLoading = false;
//     state.error = action.payload;
// },
