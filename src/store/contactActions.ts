import { useDispatch } from 'react-redux';
import { addContact, removeContact, editContact} from './contactsSlice';
import {Contact} from "types";

export const useContactActions = () => {
    const dispatch = useDispatch();

    const handleAddContact = (contact: Contact) => {
        dispatch(addContact(contact));
    };

    const handleRemoveContact = (id: number) => {
        dispatch(removeContact(id));
    };

    const handleEditContact = (id: number, updatedContact: Contact) => {
        dispatch(editContact({ id, updatedContact }));
    };

    return {
        handleAddContact,
        handleRemoveContact,
        handleEditContact,
    };
};
