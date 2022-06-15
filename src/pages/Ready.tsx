import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Select from "../components/Select";
import PopulatedField from "../components/PopulatedField";
import UserState, { Action, isValidAction } from "../types/UserState";
import SessionData from "../types/SessionData";
import TicketData from "../types/TicketData";
import axios from "axios";

interface ReadyProps {
    state: UserState;
    sessionData: SessionData;
    ticketData: TicketData;
}

const Ready = ({ state, sessionData, ticketData }: ReadyProps) => {
    const [outcome, setOutcome] = useState(ticketData.outcome);
    const [callbackDate, setCallbackDate] = useState(ticketData.callbackDate);

    const options = [
        { key: 200, value: "Resolved" },
        { key: 201, value: "Forwarded" },
        { key: 301, value: "Rejected" },
    ];

    const handleBreak = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/request-break", {
                sessionToken: sessionData.sessionToken,
                user: sessionData.username,
                campaign: sessionData.campaign,
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleCall = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/makecall", {
                sessionToken: sessionData.sessionToken,
                user: sessionData.username,
                campaign: sessionData.campaign,
                phoneNumber: ticketData.contactNumber,
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleHangup = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/hangup", {
                sessionToken: sessionData.sessionToken,
                user: sessionData.username,
                campaign: sessionData.campaign,
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleOutcome = async (_event: React.MouseEvent) => {
        console.log(outcome)
        try {
            await axios.post("/outcome", {
                sessionToken: sessionData.sessionToken,
                user: sessionData.username,
                campaign: sessionData.campaign,
                outcome: outcome,
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleCallback = async (_event: React.MouseEvent) => {
        try {
            await axios.post("/callback", {
                sessionToken: sessionData.sessionToken,
                user: sessionData.username,
                campaign: sessionData.campaign,
                callDateTime: callbackDate,
            });
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    return (
        <Form>
            <Container>
                <Stack gap={4}>
                    <Stack gap={3}>
                        <Stack direction="horizontal" gap={2}>
                            <Col>
                                <PopulatedField
                                    label="User:"
                                    value={sessionData.username}
                                />
                            </Col>
                            <Col>
                                <PopulatedField
                                    label="Campaign:"
                                    value={sessionData.campaign}
                                />
                            </Col>
                        </Stack>

                        <Stack
                            direction="horizontal"
                            gap={2}
                            className="justify-content-center"
                        >
                            <Button onClick={handleBreak}>Request Break</Button>
                        </Stack>
                    </Stack>

                    <Card>
                        <Card.Body>
                            <Card.Title>Ticket Info</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                <hr />
                            </Card.Subtitle>
                            <Stack gap={3}>
                                <Stack gap={3}>
                                    <Row>
                                        <Col md={4}>
                                            <PopulatedField
                                                label="Contact Name:"
                                                value={ticketData.contactName}
                                            />
                                        </Col>
                                        <Col md={8}>
                                            <Stack
                                                direction="horizontal"
                                                gap={3}
                                            >
                                                <Col>
                                                    <PopulatedField
                                                        label="Contact Number:"
                                                        value={
                                                            ticketData.contactNumber
                                                        }
                                                    />
                                                </Col>

                                                <Button
                                                    variant="primary"
                                                    onClick={handleCall}
                                                    disabled={!isValidAction(state, Action.MakeCall)}
                                                >
                                                    Make Call
                                                </Button>
                                                <div className="vr" />
                                                <Button
                                                    variant="danger"
                                                    onClick={handleHangup}
                                                    disabled={!isValidAction(state, Action.HangUp)}
                                                >
                                                    Hang up
                                                </Button>
                                            </Stack>
                                        </Col>
                                    </Row>
                                </Stack>

                                <Stack gap={3}>
                                    <Select
                                        label="Outcome"
                                        options={options}
                                        value={outcome}
                                        onChange={e =>
                                            setOutcome(parseInt(e.target.value))
                                        }
                                    />
                                    <Button
                                        onClick={handleOutcome}
                                        disabled={!isValidAction(state, Action.Submit)}
                                    >
                                        Submit Outcome
                                    </Button>
                                    <Form.Control
                                        type="datetime-local"
                                        value={callbackDate}
                                        onChange={e =>
                                            setCallbackDate(e.target.value)
                                        }
                                    />
                                    <Button
                                        onClick={handleCallback}
                                        disabled={!isValidAction(state, Action.Submit)}
                                    >
                                        Submit Callback
                                    </Button>
                                </Stack>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Stack>
            </Container>
        </Form>
    );
};

export default Ready;
