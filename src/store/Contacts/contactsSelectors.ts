import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";
import {ContactsState, FetchStatus} from "types";

const getAsyncStatusData = (data: ContactsState) => ({
    hasError: data?.status === FetchStatus.rejected,
    isIdle: data?.status === FetchStatus.idle,
    isLoading: data?.status === FetchStatus.pending,
    isLoaded: data?.status === FetchStatus.fulfilled,
})

const getAsyncActionData = (stateParam: ContactsState) => ({
    contacts: stateParam?.contacts,
    status: getAsyncStatusData(stateParam)
})

export const selectContactsStore = (state: RootState) => state.contacts

export const selectContacts = createSelector(selectContactsStore, (state) => getAsyncActionData(state))