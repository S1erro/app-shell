import {ContactsState, FetchStatus} from "types";

export const initialContactsState: ContactsState = {
    contacts: [],
    status: FetchStatus.pending,
};