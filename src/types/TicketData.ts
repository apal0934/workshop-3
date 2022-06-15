import { TicketDataEvent } from "./Events";

export interface Field {
    field: string;
    type: "text" | "numeric" | "datetime" | "guid";
    value: string;
}

export const ticketEventToTicketData = (event: TicketDataEvent): TicketData => {
    let ticketData: TicketData = {
        contactName: "",
        contactNumber: "",
        ticketType: "",
        outcome: 200,
        callbackDate: "",
    };

    ticketData.contactNumber = event.phoneNumber;

    for (const field of event.data) {
        switch (field.field) {
            case "Name":
                ticketData.contactName = field.value;
                break;
            case "TicketType":
                ticketData.ticketType = field.value;
                break;
            default:
                continue;
        }
    }

    return ticketData;
};

export default interface TicketData {
    contactName: string;
    contactNumber: string;
    ticketType?: string;
    outcome: number;
    callbackDate: string;
}
