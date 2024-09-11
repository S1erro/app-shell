import {RootState} from "./store";
import {createSelector} from "@reduxjs/toolkit";
import {ContactsState, ContactsStatus} from "types";

const getAsyncStatusData = (data: ContactsState) => ({
    hasError: data?.status === ContactsStatus.rejected,
    isIdle: data?.status === ContactsStatus.idle,
    isLoading: data?.status === ContactsStatus.pending,
    isLoaded: data?.status === ContactsStatus.fulfilled,
})

const getAsyncActionData = (stateParam: ContactsState) => ({
    contacts: stateParam?.contacts,
    status: getAsyncStatusData(stateParam)
})

export const selectContactsStore = (state: RootState) => state.contacts

export const selectContacts = createSelector(selectContactsStore, (state) => getAsyncActionData(state))