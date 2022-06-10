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
import UserState from "../types/ComponentState";

interface ReadyProps {
    userData: {
        username: string;
        extension: string;
        campaign: string;
    };
    ticketData: {
        contactName: string;
        contactNumber: string;
        ticketType: string;
        outcome: string;
        callbackDate: string;
    };
    state: UserState;
    callback: Function;
}

const Ready = ({ userData, ticketData, state, callback }: ReadyProps) => {
    const [outcome, setOutcome] = useState(ticketData.outcome);
    const [callbackDate, setCallbackDate] = useState(ticketData.callbackDate);
    const [dialTimer, setDialTimer] = useState<number>();

    const options = ["Option 1", "Option 2"];

    const getTicketData = () => {
        return {
            contactName: ticketData.contactName,
            contactNumber: ticketData.contactNumber,
            ticketType: ticketData.ticketType,
            outcome: outcome,
            callbackDate: callbackDate,
        };
    };

    const getEmptyTicketData = () => {
        return {
            contactName: "",
            contactNumber: "",
            ticketType: "",
            outcome: "",
            callbackDate: ""
        }
    }

    const handleBreak = (event: React.MouseEvent) => {
        event.preventDefault();

        callback(UserState.OnBreak, getTicketData());
    };

    const handleCall = (event: React.MouseEvent) => {
        event.preventDefault();

        // simulate dialling without server
        callback(UserState.Dialling, getTicketData());

        var id = window.setTimeout(() => {
            callback(UserState.OnCall, getTicketData());
        }, 2000);
        setDialTimer(id);
    };

    const handleHangup = (event: React.MouseEvent) => {
        event.preventDefault();

        clearTimeout(dialTimer);
        callback(UserState.OffCall, getTicketData());
    };

    const handleOutcome = (event: React.MouseEvent) => {
        event.preventDefault();

        callback(UserState.Ready, getEmptyTicketData());
    };

    const handleCallback = (event: React.MouseEvent) => {
        event.preventDefault();

        callback(UserState.Ready, getEmptyTicketData());
    };

    var canBreak = state === UserState.Ready;
    var canHangUp = state === UserState.Dialling || state === UserState.OnCall;
    var canMakeCall = state === UserState.OffCall;
    var canSubmitOutcome =
        state === UserState.OffCall || state === UserState.OnCall;
    var canSubmitCallback = canSubmitOutcome;

    return (
        <Form>
            <Container>
                <Stack gap={4}>
                    <Stack gap={3}>
                        <Stack direction="horizontal" gap={2}>
                            <Col>
                                <PopulatedField
                                    label="User:"
                                    value={userData.username}
                                />
                            </Col>
                            <Col>
                                <PopulatedField
                                    label="Extension:"
                                    value={userData.extension}
                                />
                            </Col>
                            <Col>
                                <PopulatedField
                                    label="Campaign:"
                                    value={userData.campaign}
                                />
                            </Col>
                        </Stack>

                        <Stack
                            direction="horizontal"
                            gap={2}
                            className="justify-content-center"
                        >
                            <Button onClick={handleBreak} disabled={!canBreak}>
                                Request Break
                            </Button>
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
                                        <Col>
                                            <PopulatedField
                                                label="Contact Name:"
                                                value={ticketData.contactName}
                                            />
                                        </Col>
                                        <Col>
                                            <PopulatedField
                                                label="Ticket Type:"
                                                value={ticketData.ticketType}
                                            />
                                        </Col>
                                    </Row>

                                    <Stack direction="horizontal" gap={3}>
                                        <Col>
                                            <PopulatedField
                                                label="Contact Number:"
                                                value={ticketData.contactNumber}
                                            />
                                        </Col>

                                        <Button
                                            variant="primary"
                                            onClick={handleCall}
                                            disabled={!canMakeCall}
                                        >
                                            Make Call
                                        </Button>
                                        <div className="vr" />
                                        <Button
                                            variant="danger"
                                            onClick={handleHangup}
                                            disabled={!canHangUp}
                                        >
                                            Hang up
                                        </Button>
                                    </Stack>
                                </Stack>

                                <Stack gap={3}>
                                    <Select
                                        label="Outcome"
                                        options={options}
                                        value={outcome}
                                        onChange={e =>
                                            setOutcome(e.target.value)
                                        }
                                    />
                                    <Button
                                        onClick={handleOutcome}
                                        disabled={!canSubmitOutcome}
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
                                        disabled={!canSubmitCallback}
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
