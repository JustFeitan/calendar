import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useAppDispatch, useTypedSelector} from "../hooks/useTypedSelector";
import {login} from "../store/reducers/auth/ActionCreators";
import {useLocation, useNavigate} from "react-router-dom";

const LoginForm: FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const {error, isLoading, isAuth, user} = useTypedSelector(state => state.authReducer);

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    console.log(isAuth);

    const sumbit = () => {
        dispatch(login({username: username, password: password}));
    }

    useEffect(() => {
        if (!isAuth) return;
        navigate(fromPage, {replace: true});
    }, [isAuth])

    const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <Form labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              onFinish={sumbit}
        >
            {error && <div>{error}</div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input username')]}
            >
                <Input value={username} onChange={onChangeUsername}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="Password"
                rules={[rules.required('Please input password')]}
            >
                <Input value={password} onChange={onChangePassword}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
