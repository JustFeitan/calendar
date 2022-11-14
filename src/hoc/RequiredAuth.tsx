import React, {FC} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {AppRoutes} from "../router/routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface RequiredAuth {
    children: JSX.Element;
}

const RequiredAuth: FC<RequiredAuth> = ({children}) => {
    const location = useLocation();
    const {isAuth} = useTypedSelector(state => state.authReducer);
    if (!isAuth) {
        return <Navigate to={AppRoutes.LOGIN} state={{from: location}} replace/>
    }
    return children;
};

export default RequiredAuth;
