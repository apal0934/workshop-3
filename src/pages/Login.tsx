import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Input from "../components/Input";
import UserState, { Action, isValidAction } from "../types/UserState";
import axios from "axios";
import SessionData from "../types/SessionData";

interface LoginProps {
    state: UserState;
    sessionData: SessionData;
    updateSessionData: (sessionData: Partial<SessionData>) => void;
}

const LoginField = ({ state, sessionData, updateSessionData }: LoginProps) => {
    const [username, setUsername] = useState(sessionData.username);
    const [password, setPassword] = useState(sessionData.password);
    const [serverAddress, setServerAddress] = useState(
        sessionData.serverAddress
    );
    const [sessionToken, setSessionToken] = useState(sessionData.sessionToken);

    const handleConnect = async (_event: React.MouseEvent) => {
        let address = serverAddress;

        if (address.startsWith("https")) {
            address = address.replace("https", "http");
        }
        if (!address.startsWith("http://")) {
            address = "http://" + address;
        }
        if (!address.endsWith("/")) {
            address = address + "/";
        }

        setServerAddress(address);
        axios.defaults.baseURL = address + "api";

        try {
            await axios.get("/service-status");
        } catch (error) {
            alert("Could not connect to server!");
            return;
        }

        try {
            const createSessionResponse = await axios.post("/session-create", {
                User: username,
            });

            setSessionToken(createSessionResponse.data.sessionToken);
            updateSessionData({
                serverAddress: address,
                sessionToken: createSessionResponse.data.sessionToken,
                username: username,
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleDisconnect = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/session-release", {
                SessionToken: sessionToken,
            });

            updateSessionData({
                serverAddress: "",
                sessionToken: "",
                username: "",
                password: "",
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleLogin = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/login", {
                SessionToken: sessionToken,
                User: username,
                Password: password,
            });

            updateSessionData({
                serverAddress: serverAddress,
                sessionToken: sessionToken,
                username: username,
                password: password,
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleLogout = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/request-logout", {
                SessionToken: sessionToken,
                User: username,
                Campaign: "Tickets",
            });

            updateSessionData({
                serverAddress: serverAddress,
                sessionToken: "",
                username: "",
                password: "",
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleReady = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/resume", {
                SessionToken: sessionToken,
                User: username,
                Campaign: "Tickets",
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    return (
        <Form>
            <Container>
                <Stack gap={3} className="col-md-9 mx-auto">
                    <Input
                        label="Server Address:"
                        value={serverAddress}
                        onChange={e => setServerAddress(e.target.value)}
                        disabled={!isValidAction(state, Action.Connect)}
                    />
                    <Input
                        label="User:"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        disabled={!isValidAction(state, Action.Connect)}
                    />
                    {isValidAction(state, Action.Connect) ? (
                        <Button
                            onClick={handleConnect}
                            disabled={!isValidAction(state, Action.Connect)}
                        >
                            Create session
                        </Button>
                    ) : (
                        <Button
                            onClick={handleDisconnect}
                            disabled={!isValidAction(state, Action.Disconnect)}
                        >
                            Disconnect session
                        </Button>
                    )}

                    <Input
                        label="Password:"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={!isValidAction(state, Action.Login)}
                    />

                    <Stack direction="horizontal" gap={1}>
                        {isValidAction(state, Action.Login) ? (
                            <Button
                                onClick={handleLogin}
                                disabled={!isValidAction(state, Action.Login)}
                                className="col-md-5 mx-auto"
                            >
                                Login
                            </Button>
                        ) : (
                            <Button
                                onClick={handleLogout}
                                disabled={!isValidAction(state, Action.Logout)}
                                className="col-md-5 mx-auto"
                            >
                                Logout
                            </Button>
                        )}
                        <Button
                            onClick={handleReady}
                            disabled={!isValidAction(state, Action.Ready)}
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
