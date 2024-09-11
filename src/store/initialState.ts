import {ContactsState, ContactsStatus} from "types";

export const initialState: ContactsState = {
    contacts: [],
    status: ContactsStatus.pending,
};