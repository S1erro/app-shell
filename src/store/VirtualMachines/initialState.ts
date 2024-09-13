import {ContactsState, FetchStatus} from "types";

export const initialState: ContactsState = {
    contacts: [],
    status: FetchStatus.pending,
};