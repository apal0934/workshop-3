import React, { ReactElement, useState } from 'react';
import ComponentState from "../types/ComponentState";
import Header from '../components/Header';
import LoginData from '../types/LoginData';
import TicketData from '../types/TicketData';
import UserData from '../types/UserData';
import LoginField from './Login';
import Ready from './Ready';

const MainPage = () => {
    const [state, setState] = useState(ComponentState.LoggedOut);
    const [loginData, setLoginData] = useState<LoginData>({username: "", password: "", isLoggedIn: false});
    const [userData, setUserData] = useState<UserData>({username: "", extension: "", campaign: ""});
    const [ticketData, setTicketData] = useState<TicketData>({
        contactName: "",
        contactNumber: "",
        ticketType: "",
        outcome: "",
        callbackDate: ""
    });

    const handleUser = (state: ComponentState, loginData: LoginData) => {
        setState(state);
        setLoginData(loginData);
    }

    const handleReady = (state: ComponentState, userData: UserData, ticketData: TicketData) => {
        setState(state);
        setUserData(userData);
        setTicketData(ticketData);
    }

    var body: Element | ReactElement<any, any>;
    switch (state) {
        case ComponentState.LoggedOut:
        case ComponentState.LoggedIn:
        case ComponentState.OnBreak:
            body = <LoginField loginData={loginData} callback={handleUser}/>
            break;
        case ComponentState.Dialling:
        case ComponentState.OnCall:
        case ComponentState.OffCall:
        case ComponentState.Ready:
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