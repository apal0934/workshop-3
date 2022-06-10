import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ComponentState from '../types/ComponentState';

interface HeaderProps {
    state: ComponentState;
}

const Header = ({state} : HeaderProps) => {
    var text: string;

    switch (state) {
        case ComponentState.LoggedOut:
            text = "Logged Out";
            break;
        case ComponentState.LoggedIn:
            text = "Logged In";
            break;
        case ComponentState.Ready:
            text = "Ready";
            break;
        case ComponentState.Dialling:
            text = "Dialling...";
            break;
        case ComponentState.OnCall:
            text = "On Call";
            break;
        case ComponentState.OffCall:
            text = "Off Call";
            break;
        case ComponentState.OnBreak:
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