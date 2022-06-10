import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import UserState from '../types/ComponentState';

interface HeaderProps {
    state: UserState;
}

const Header = ({state} : HeaderProps) => {
    var text: string;

    switch (state) {
        case UserState.LoggedOut:
            text = "Logged Out";
            break;
        case UserState.LoggedIn:
            text = "Logged In";
            break;
        case UserState.Ready:
            text = "Ready";
            break;
        case UserState.Dialling:
            text = "Dialling...";
            break;
        case UserState.OnCall:
            text = "On Call";
            break;
        case UserState.OffCall:
            text = "Off Call";
            break;
        case UserState.OnBreak:
            text = "On Break";
            break;
        default:
            text = "Unknown state";
    }

    return (
        <div>
            <Navbar variant="dark" bg="primary">
                <Container>
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text style={{color: "white"}}>{text}</Navbar.Text>
                    </Navbar.Collapse>      
                </Container>
            </Navbar>
            <br/>
        </div>
    )
}

export default Header;