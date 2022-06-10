import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Input from '../components/Input';
import Select from '../components/Select';

const Header = () => {
    return (
        <Navbar variant="dark" bg="primary">
            <Container>
                <Navbar.Brand>
                    Aristocrat Ticketing Service
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header;