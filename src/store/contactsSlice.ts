import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Contact, ContactsStatus} from "types";
import {initialState} from "./initialState";
import {fetchContacts} from "./api";

export const fetchedContacts = createAsyncThunk(
    'users/fetchById',
    async () => {
        return await fetchContacts()
    },
)

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
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
                state.status = ContactsStatus.pending;
            })
            .addCase(fetchedContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.status = ContactsStatus.fulfilled;
            })
            .addCase(fetchedContacts.rejected, (state, action) => {
                state.status = ContactsStatus.rejected;
            });
    }
});

export const {addContact, removeContact, editContact} = contactsSlice.actions;

export default contactsSlice.reducer;
