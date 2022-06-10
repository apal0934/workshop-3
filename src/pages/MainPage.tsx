import React, { ReactElement, useState } from 'react';
import UserState from "../types/ComponentState";
import Header from '../components/Header';
import LoginData from '../types/LoginData';
import TicketData from '../types/TicketData';
import UserData from '../types/UserData';
import LoginField from './Login';
import Ready from './Ready';

const MainPage = () => {
    const [state, setState] = useState(UserState.LoggedOut);
    const [loginData, setLoginData] = useState<LoginData>({username: "", password: "", isLoggedIn: false});
    const [userData, setUserData] = useState<UserData>({username: "", extension: "", campaign: ""});
    const [ticketData, setTicketData] = useState<TicketData>({
        contactName: "",
        contactNumber: "",
        ticketType: "",
        outcome: "",
        callbackDate: ""
    });

    const handleUser = (state: UserState, loginData: LoginData) => {
        setState(state);
        setLoginData(loginData);
    }

    const handleReady = (state: UserState, userData: UserData, ticketData: TicketData) => {
        setState(state);
        setUserData(userData);
        setTicketData(ticketData);
    }

    var body: Element | ReactElement<any, any>;
    switch (state) {
        case UserState.LoggedOut:
        case UserState.LoggedIn:
        case UserState.OnBreak:
            body = <LoginField loginData={loginData} callback={handleUser}/>
            break;
        case UserState.Dialling:
        case UserState.OnCall:
        case UserState.OffCall:
        case UserState.Ready:
            body = <Ready userData={userData} ticketData={ticketData} callback={handleReady} state={state}/>;
            break;
        default:
            body = <h1>Error: Unknown state</h1>
    }

    return (
        <div>
            <Header state={state}/>
            {body}
        </div>
    )
}

export default MainPage;