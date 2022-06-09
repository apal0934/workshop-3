import React, { useState } from 'react';
import ComponentState from "../components/ComponentState";
import LoginField from './Login';

const MainPage = () => {
    const [state, setState] = useState(ComponentState.LoggedOut);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
        loggedIn: false
    })

    const handleLogin = (loginData: {username: string, password: string, loggedIn: boolean}) => {
        setState(ComponentState.Available);
        setLoginData(loginData);
    }

    switch (state) {
        case ComponentState.LoggedOut:
            return <LoginField {...loginData} readyCallback={handleLogin}/>
        case ComponentState.Available:
            return <h1>available</h1>;
        default:
            return <h1>Error: Unknown state</h1>
    }
}

export default MainPage;