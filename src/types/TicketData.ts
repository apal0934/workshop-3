export interface Field {
    field: string;
    type: string;
    value: string | number;
}

export default interface TicketData {
    contactName: string;
    contactNumber: string;
    ticketType: string;
    outcome: string;
    callbackDate: string;
}
