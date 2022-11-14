import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppReducer, AppStore} from "../store";

export const useTypedSelector: TypedUseSelectorHook<AppReducer> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
