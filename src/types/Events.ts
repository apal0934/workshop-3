import { Field } from "./TicketData";

export interface StatusChangeEvent {
    sessionToken: string;
    event: string;
    user: string,
    campaign: string;
    expiry: string;
}

export interface TicketDataEvent extends StatusChangeEvent {
    phone: string;
    data: Array<Field>;
}