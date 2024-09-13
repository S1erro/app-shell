import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Contact, FetchStatus} from "types";
import {initialContactsState} from "./initialState";
import {fetchContacts} from "../api";

export const fetchedContacts = createAsyncThunk(
    'users/fetchById',
    async () => {
        return await fetchContacts()
    },
)

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: initialContactsState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action: PayloadAction<number>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },
        editContact: (state, action: PayloadAction<{ id: number, updatedContact: Contact }>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload.updatedContact;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedContacts.pending, (state) => {
                state.status = FetchStatus.pending;
            })
            .addCase(fetchedContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.status = FetchStatus.fulfilled;
            })
            .addCase(fetchedContacts.rejected, (state) => {
                state.status = FetchStatus.rejected;
            });
    }
});

export const {addContact, removeContact, editContact} = contactsSlice.actions;

export default contactsSlice.reducer;
