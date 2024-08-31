import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from "types";

interface ContactsState {
    contacts: Contact[];
}

const initialState: ContactsState = {
    contacts: [
        {
            "name": "Димас Донской",
            "email": "Dimon2012@mail.ru",
            "phone": "89214212314",
            "category": "Враг",
            "gender": "Мужчина",
            "id": 0.23
        },
        {
            "name": "Димас Донской",
            "email": "NeDimon2012@mail.ru",
            "phone": "89214212314",
            "category": "Враг",
            "gender": "Мужчина",
            "id": 0.11109
        },
        {
            "name": "Гребень Пушистый",
            "email": "AkulaMonster@shark.com",
            "phone": "89214122314",
            "category": "Друг",
            "gender": "Женщина",
            "id": 0.12902
        },
        {
            "name": "Оливье Прошлогодний",
            "email": "oliveHero@mail.ru",
            "phone": "89214291814",
            "category": "Знакомый",
            "gender": "",
            "id": 0.96102
        },
        {
            "name": "Пластырь Позорный",
            "email": "pozner@gmail.com",
            "phone": "",
            "category": "Друг",
            "gender": "Мужчина",
            "id": 0.651
        }
    ],
};

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
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;

export default contactsSlice.reducer;
