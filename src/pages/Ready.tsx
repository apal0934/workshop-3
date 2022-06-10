import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Stack, Row, Card } from "react-bootstrap";
import Input from "../components/Input";
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

const Ready = ({userData, ticketData, state, callback} : ReadyProps) => {
  const [username, setUsername] = useState(userData.username)
  const [extension, setExtension] = useState(userData.extension)
  const [campaign, setCampaign] = useState(userData.campaign)

  const [contactName, setContactName] = useState(ticketData.contactName);
  const [contactNumber, setContactNumber] = useState(ticketData.contactNumber);
  const [ticketType, setTicketType] = useState(ticketData.ticketType)
  const [outcome, setOutcome] = useState(ticketData.outcome);
  const [callbackDate, setCallbackDate] = useState(ticketData.callbackDate);

  const options = ["Option 1", "Option 2"];

  const getUserData = () => {
      return {
        username: username,
        extension: extension,
        campaign: campaign
      }
  }

  const getTicketData = () => {
        return {
            contactName: contactName,
            contactNumber: contactNumber,
            ticketType: ticketType,
            outcome: outcome,
            callbackDate: callbackDate
        }
    }

  const handleBreak = (event: React.MouseEvent) => {
    callback(UserState.OnBreak, getUserData(), getTicketData());
  }

  const handleCall = (event: React.MouseEvent) => {
    callback(UserState.OnCall, getUserData(), getTicketData());
  }

  const handleHangup = (event: React.MouseEvent) => {
    callback(UserState.OffCall, getUserData(), getTicketData());
  }

  const handleOutcome = (event: React.MouseEvent) => {
    callback(UserState.Ready, getUserData(), getTicketData());
  }

  const handleCallback = (event: React.MouseEvent) => {
    callback(UserState.Ready, getUserData(), getTicketData());
  }

  var canBreak = state === UserState.Ready;
  var canHangUp = state === UserState.Dialling || state === UserState.OnCall;
  var canMakeCall = state === UserState.OffCall;
  var canSubmitOutcome = state === UserState.OffCall || state === UserState.OnCall;
  var canSubmitCallback = canSubmitOutcome;

  return (
    <Form>
      <Container>
        <Stack gap={4}>
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2}>
              <Col>
                <PopulatedField label="User:" value={username} />
              </Col>
              <Col>
                <PopulatedField label="Extension:" value={extension} />
              </Col>
              <Col>
                <PopulatedField label="Campaign:" value={campaign}/>
              </Col>
            </Stack>

            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-center"
            >
              <Button onClick={handleBreak} disabled={!canBreak}>Request Break</Button>
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
                        value={contactName}
                      />
                    </Col>
                    <Col>
                      <PopulatedField label="Ticket Type:" value={ticketType} />
                    </Col>
                  </Row>

                  <Stack direction="horizontal" gap={3}>
                    <Col>
                      <PopulatedField
                        label="Contact Number:"
                        value={contactNumber}
                      />
                    </Col>

                    <Button variant="primary" onClick={handleCall} disabled={!canMakeCall}>Make Call</Button>
                    <div className="vr" />
                    <Button variant="danger" onClick={handleHangup} disabled={!canHangUp}>Hang up</Button>
                  </Stack>
                </Stack>

                <Stack gap={3}>
                  <Select label="Outcome" options={options} value={outcome} onChange={e => setOutcome(e.target.value)} />
                  <Button onClick={handleOutcome} disabled={!canSubmitOutcome}>Submit Outcome</Button>
                  <Form.Control type="datetime-local" value={callbackDate} onChange={e => setCallbackDate(e.target.value)}/>
                  <Button onClick={handleCallback} disabled={!canSubmitCallback}>Submit Callback</Button>
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
