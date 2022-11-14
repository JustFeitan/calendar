import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import Event from "../pages/Event";
import {AppRoutes} from "../router/routes";
import Login from "../pages/Login";

import RequiredAuth from "../hoc/RequiredAuth";
import AppLayout from "./AppLayout";

const AppRouter: FC = () => {
    return (
        <>
            <Routes>
                <Route path={AppRoutes.EVENT} element={<AppLayout/>} >
                    <Route index element={
                        <RequiredAuth>
                            <Event/>
                        </RequiredAuth>
                    }/>
                    <Route path={AppRoutes.LOGIN} element={<Login/>}/>
                </Route>

            </Routes>
        </>
    );
};

export default AppRouter;
