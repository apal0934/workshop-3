import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Input from '../components/Input';
import Select from '../components/Select';

interface LoginProps {
    username: string;
    password: string;
    loggedIn: boolean;
    readyCallback: Function;
}

const LoginField = ({username, password, loggedIn, readyCallback} : LoginProps) => {
    const [_username, setUsername] = useState(username);
    const [_password, setPassword] = useState(password);
    const [_loggedIn, setLoggedIn] = useState(loggedIn);

    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault();

        // check credentials agaisnt server
        setLoggedIn(!_loggedIn);
    }

    const handleReady = (event: React.MouseEvent) => {
        event.preventDefault();

        if (_loggedIn) {
            readyCallback({
                username: _username,
                password: _password,
                loggedIn: _loggedIn
            });
        }
    }

    return (
        <Container>
            <Form>
                <Input label="Username" 
                                value={_username} 
                                onChange={e => setUsername(e.target.value)}
                                disabled={_loggedIn} />

                <Input label="Password" 
                                value={_password} 
                                onChange={e => setPassword(e.target.value)}
                                disabled={_loggedIn} />

                <Select label="Outcome"
                        options={["Option 1", "Option 2"]} />
                
                <Button variant="primary" onClick={handleLogin}>
                    {_loggedIn ? "Logout" : "Login"}
                </Button>

                <Button variant='primary' onClick={handleReady} disabled={!_loggedIn}>
                    Available
                </Button>
            </Form>
        </Container>
    )
}

export default LoginField;