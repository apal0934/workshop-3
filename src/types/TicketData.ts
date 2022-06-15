export interface Field {
    field: string;
    type: "text" | "numeric" | "datetime" | "guid";
    value: string;
}

export const fieldsToTicket = (fields: Array<Field>): TicketData | undefined => {
    let ticketData: TicketData = {
        contactName: "",
        contactNumber: "",
        ticketType: "",
        outcome: "",
        callbackDate: "",
    };

    for (const field of fields) {
        switch (field.field) {
            case "ContactName":
                ticketData.contactName = field.value;
                break;
            case "ContactNumber":
                ticketData.contactNumber = field.value;
                break;
            case "TicketType":
                ticketData.ticketType = field.value;
                break;
            default:
                continue;
        }
    }

    if (ticketData.contactName === "" || ticketData.contactNumber === "" || ticketData.ticketType === "") return undefined;
    
    return ticketData;
};

export default interface TicketData {
    contactName: string;
    contactNumber: string;
    ticketType: string;
    outcome: string;
    callbackDate: string;
}
