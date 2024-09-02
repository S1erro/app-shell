import {Contact} from "types";

interface ContactsState {
    contacts: Contact[];
    isLoading: boolean;
}

export const initialState: ContactsState = {
    contacts: [],
    isLoading: false,
};