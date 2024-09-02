import {RootState} from "./store";

export const selectContacts = (state: RootState) => {
    return state.contacts.contacts
}

export const selectIsLoading = (state: RootState) => {
    return state.contacts.isLoading;
}