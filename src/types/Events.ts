import { Field } from "./TicketData";

interface BaseEvent {
    sessionToken: string;
    event: string;
    user: string;
    campaign: string;
    expiry: string;
}

export interface StatusChangeEvent extends BaseEvent {
    status: string;
}

export interface TicketDataEvent extends BaseEvent {
    phoneNumber: string;
    data: Array<Field>;
}

export interface ErrorEvent extends BaseEvent {
    errorMessage: string;
}

export const isStatusChangeEvent = (event: object): event is StatusChangeEvent =>
(event as StatusChangeEvent).event === "StatusChange";

export const isTicketDataEvent = (event: object): event is TicketDataEvent =>
    (event as TicketDataEvent).event === "TicketData";

export const isErrorEvent = (event: object): event is ErrorEvent =>
    (event as ErrorEvent).event === "ErrorMessage";