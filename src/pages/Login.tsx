import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Stack } from 'react-bootstrap';
import Input from '../components/Input';
import UserState from '../types/ComponentState';
import LoginData from '../types/LoginData';

interface LoginProps {
    loginData: LoginData;
    callback: Function;
}

const LoginField = ({ loginData, callback }: LoginProps) => {
    const [username, setUsername] = useState(loginData.username);
    const [password, setPassword] = useState(loginData.password);
    const [isLoggedIn, setisLoggedIn] = useState(loginData.isLoggedIn);

    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault();

        // check credentials agaisnt server
        var isLoggedIn = true;
        setisLoggedIn(isLoggedIn);
       
        if (isLoggedIn) {
            callback(UserState.LoggedIn, {
                username: username,
                password: password,
                isLoggedIn: true
            });
        }
    }

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();

        setisLoggedIn(false);
        callback(UserState.LoggedOut, {
            username: "",
            password: "",
            isLoggedIn: false
        });
        
    }

    const handleReady = (event: React.MouseEvent) => {
        event.preventDefault();

        if (isLoggedIn) {
            callback(UserState.Ready, {
                username: username,
                password: password,
                isLoggedIn: true
            });
        }
    }

    return (
        <Form>
            <Container>
                <Stack gap={3} className="col-md-9 mx-auto">
                    <Input label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        disabled={isLoggedIn} />

                    <Input label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={isLoggedIn} />

                    <Stack direction='horizontal' gap={1}> 
                        <Button variant="primary" onClick={isLoggedIn ? handleLogout : handleLogin} className="col-md-5 mx-auto">
                            {isLoggedIn ? "Logout" : "Login"}
                        </Button> 
                        <Button variant='primary' onClick={handleReady} disabled={!isLoggedIn} className="col-md-5 mx-auto">
                            Ready
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Form>
    )
}

export default LoginField;