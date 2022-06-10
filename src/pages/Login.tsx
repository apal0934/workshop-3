import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Input from "../components/Input";
import UserState from "../types/ComponentState";
import LoginData from "../types/LoginData";

interface LoginProps {
    state: UserState;
    loginData: LoginData;
    callback: Function;
}

const LoginField = ({ state, loginData, callback }: LoginProps) => {
    const [username, setUsername] = useState(loginData.username);
    const [password, setPassword] = useState(loginData.password);
    const [isLoggedIn, setisLoggedIn] = useState(loginData.isLoggedIn);
    const [serverAddress, setServerAddress] = useState(loginData.serverAddress);

    const handleConnect = (event: React.MouseEvent) => {
        event.preventDefault();

        var didConnect = true;
        if (didConnect) {
            callback(UserState.LoggedOut, {
                username: "",
                password: "",
                isLoggedIn: false,
                serverAddress: serverAddress
            });
        }
    };

    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault();

        // check credentials agaisnt server
        var isLoggedIn = true;
        setisLoggedIn(isLoggedIn);

        if (isLoggedIn) {
            callback(UserState.LoggedIn, {
                username: username,
                password: password,
                isLoggedIn: true,
                serverAddress: serverAddress
            });
        }
    };

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();

        setisLoggedIn(false);
        callback(UserState.LoggedOut, {
            username: "",
            password: "",
            isLoggedIn: false,
            serverAddress: serverAddress
        });
    };

    const handleReady = (event: React.MouseEvent) => {
        event.preventDefault();

        if (isLoggedIn) {
            callback(UserState.Ready, {
                username: username,
                password: password,
                isLoggedIn: true,
                serverAddress: serverAddress
            });
        }
    };

    var canConnect = state === UserState.Disconnected;
    var canLogin = state === UserState.LoggedOut;
    var canReady = state === UserState.LoggedIn || state === UserState.OnBreak;

    return (
        <Form>
            <Container>
                <Stack gap={3} className="col-md-9 mx-auto">
                    <Input
                        label="Server Address:"
                        value={serverAddress}
                        onChange={e => setServerAddress(e.target.value)}
                        disabled={!canConnect}
                    />
                    <Button onClick={handleConnect} disabled={!canConnect}>
                        Connect
                    </Button>

                    <Input
                        label="Username:"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        disabled={!canLogin}
                    />

                    <Input
                        label="Password:"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={!canLogin}
                    />

                    <Stack direction="horizontal" gap={1}>
                        <Button
                            onClick={isLoggedIn ? handleLogout : handleLogin}
                            className="col-md-5 mx-auto"
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </Button>
                        <Button
                            onClick={handleReady}
                            disabled={!canReady}
                            className="col-md-5 mx-auto"
                        >
                            Ready
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Form>
    );
};

export default LoginField;
