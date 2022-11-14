import {combineReducers, configureStore} from "@reduxjs/toolkit";
import reducers from './reducers'

export const rootReducer = combineReducers(reducers)

export const getStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type AppReducer = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof getStore>;
export type AppDispatch = AppStore['dispatch'];
