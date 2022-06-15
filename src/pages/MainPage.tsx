import React, { ReactElement, useEffect, useState } from "react";
import UserState from "../types/ComponentState";
import Header from "../components/Header";
import LoginData from "../types/LoginData";
import TicketData from "../types/TicketData";
import UserData from "../types/UserData";
import LoginField from "./Login";
import Ready from "./Ready";

const MainPage = () => {
    const [state, setState] = useState(UserState.Disconnected);
    const [loginData, setLoginData] = useState<LoginData>({
        username: "",
        password: "",
        isLoggedIn: false,
        serverAddress: "",
    });
    const [userData, setUserData] = useState<UserData>({
        username: "",
        extension: "",
        campaign: "",
    });
    const [ticketData, setTicketData] = useState<TicketData>({
        contactName: "",
        contactNumber: "",
        ticketType: "",
        outcome: "",
        callbackDate: "",
    });
    const [randomTicketTimer, setRandomTicketTimer] = useState<number>();

    const handleUser = (state: UserState, loginData: LoginData) => {
        setState(state);
        setLoginData(loginData);
        clearTimeout(randomTicketTimer);
    };

    const handleReady = (state: UserState, ticketData: TicketData) => {
        setState(state);
        setTicketData(ticketData);
        clearTimeout(randomTicketTimer);
    };

    // Give random ticket every five seconds for testing without server
    useEffect(() => {
        if (state === UserState.Ready) {
            var id = window.setTimeout(() => {
                setTicketData({
                    contactName: Math.random().toString(36).slice(2),
                    contactNumber: Math.random().toString(),
                    ticketType: Math.random().toString(36).slice(2),
                    outcome: "",
                    callbackDate: "",
                });
                setState(
                    Math.random() > 0.5 ? UserState.Wrapping : UserState.OnCall
                );
            }, 5000);
            setRandomTicketTimer(id);
        }
    }, [state]);

    var body: Element | ReactElement<any, any>;
    switch (state) {
        case UserState.Disconnected:
        case UserState.LoggedOut:
        case UserState.LoggedIn:
        case UserState.OnBreak:
            body = (
                <LoginField
                    state={state}
                    loginData={loginData}
                    callback={handleUser}
                />
            );
            break;
        case UserState.Dialling:
        case UserState.OnCall:
        case UserState.Wrapping:
        case UserState.Ready:
            body = (
                <Ready
                    userData={userData}
                    ticketData={ticketData}
                    callback={handleReady}
                    state={state}
                />
            );
            break;
        default:
            body = <h1>Error: Unknown state</h1>;
    }

    return (
        <div>
            <Header state={state} />
            {body}
        </div>
    );
};

export default MainPage;
