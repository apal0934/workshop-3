import React, { ReactElement, useState } from "react";
import UserState from "../types/UserState";
import Header from "../components/Header";
import TicketData, { ticketEventToTicketData } from "../types/TicketData";
import SessionData from "../types/SessionData";
import LoginField from "./Login";
import Ready from "./Ready";
import axios from "axios";
import {
    isErrorEvent,
    isStatusChangeEvent,
    isTicketDataEvent,
} from "../types/Events";

const MainPage = () => {
    const [pollTimer, setPollTimer] = useState<number | undefined>();
    const [state, setState] = useState(UserState.Disconnected);

    const [sessionData, setSessionData] = useState<SessionData>({
        serverAddress: "",
        sessionToken: "",
        username: "",
        password: "",
        campaign: "Tickets",
    });

    const [ticketData, setTicketData] = useState<TicketData>({
        contactName: "",
        contactNumber: "",
        ticketType: "",
        outcome: 200,
        callbackDate: "",
    });

    const pollData = async (token: string, user: string, campaign: string) => {
        try {
            const event = await axios.post("/poll-event", {
                sessionToken: token,
                user: user,
                campaign: campaign,
            });
            if (isStatusChangeEvent(event.data)) {
                const newState: UserState = UserState[event.data.status as keyof typeof UserState];
                setState(newState);
            } else if (isTicketDataEvent(event.data)) {
                setTicketData(ticketEventToTicketData(event.data));
            } else if (isErrorEvent(event.data)) {
                console.log(event.data.errorMessage);
            }
        } catch (error: any) {
            window.clearInterval(pollTimer);
            console.log(error.response.data);
        }
    };

    const updateSessionData = (data: Partial<SessionData>) => {
        setSessionData({ ...sessionData, ...data });
        if (state === UserState.Disconnected) {
            setState(UserState.LoggedOut);
            let fn = () => pollData(data.sessionToken!, data.username!, data.campaign!);
            setPollTimer(window.setInterval(fn, 2000));
        }
        if (Object.values(data).every(entry => entry === "")) {
            window.clearInterval(pollTimer);
            setState(UserState.Disconnected);
        }
    };

    var body: Element | ReactElement<any, any>;
    switch (state) {
        case UserState.Disconnected:
        case UserState.LoggedOut:
        case UserState.LoggedIn:
        case UserState.OnBreak:
            body = (
                <LoginField
                    state={state}
                    sessionData={sessionData}
                    updateSessionData={updateSessionData}
                />
            );
            break;
        case UserState.Dialling:
        case UserState.OnCall:
        case UserState.OffCall:
        case UserState.Ready:
            body = (
                <Ready
                    state={state}
                    sessionData={sessionData}
                    ticketData={ticketData}
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
