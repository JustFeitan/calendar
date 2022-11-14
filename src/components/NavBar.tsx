import React, {FC} from 'react';
import {Header} from "antd/es/layout/layout";
import {Menu, MenuProps, Row} from "antd";
import {Link} from "react-router-dom";
import {AppRoutes} from "../router/routes";
import {useAppDispatch, useTypedSelector} from "../hooks/useTypedSelector";
import {logout} from "../store/reducers/auth/ActionCreators";

const NavBar: FC = () => {

    const {isAuth} = useTypedSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const username = localStorage.getItem('username');
    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'Logout') {
            dispatch(logout())
        }
    }

    const items: MenuProps['items'] = [
        {
            label: (
                <Link to={AppRoutes.EVENT}>Event</Link>
            ),
            key: 'event',
        },
        {
            label: (
                <Link to={AppRoutes.LOGIN}>Login</Link>
            ),
            key: 'Login',
        },
    ];
    const items2: MenuProps['items'] = [
        {
            label: 'Logout',
            key: 'Logout',
        }
    ];
    return (
        <Header>
            <Row justify='end'>
                {isAuth
                    ? <>
                        <div style={{color: 'white'}}>{username}</div>
                        <Menu onClick={onClick} theme="dark" mode="horizontal" items={items2} selectable={false}
                              disabledOverflow/>
                    </>
                    : <Menu onClick={onClick} theme="dark" mode="horizontal" items={items} selectable={false}
                            disabledOverflow/>
                }

            </Row>
        </Header>

    );
};

export default NavBar;
