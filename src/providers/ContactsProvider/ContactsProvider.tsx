import React, {useState, createContext, FC, ReactNode} from 'react';
import {Contact} from "types/interfaces/interfaces";

interface ContactsProviderProps {
    children: ReactNode;
}

interface ContactsContextType  {
    contacts: Contact[];
    addContact: (contact: Contact) => void;
    removeContact: (email: string) => void;
    editContact: (email: string, updatedContact: Contact) => void;
}

export const ContactsContext = createContext<ContactsContextType | null>(null);

const ContactsProvider: FC<ContactsProviderProps> = ({children}) => {

    const [contacts, setContacts] = useState<Contact[]>([
        {
            name: "Dohn Johnson",
            email: "das521dh@husa.ru",
            phone: "89214212314",
            category: "Enemy",
            gender: "Male"
        },
        {
            name: "Aohn Johnson",
            email: "dasd56h@husa.ru",
            phone: "89214212314",
            category: "Friend",
            gender: "Female"
        },
        {
            name: "Bohn Johnson",
            email: "dasdh4@husa.ru",
            phone: "89214212314",
            category: "NPC",
        },
        {
            name: "John Johnson",
            email: "dasdh@husa2.ru",
            category: "Friend",
            gender: "Male"
        },
    ]);

    const addContact = (contact: Contact) => {
        setContacts([...contacts, contact])
    }

    const removeContact = (email: string) => {
        const updatedContacts = contacts.filter((contact) => contact.email !== email);

        setContacts(updatedContacts)
    }

    const editContact = (email: string, updatedContact: Contact) => {
        const updatedContacts = contacts.map((contact) =>
            contact.email === email ? updatedContact : contact)

        setContacts(updatedContacts)
    }

    return (
        <ContactsContext.Provider value={{contacts, addContact, removeContact, editContact}}>
            {children}
        </ContactsContext.Provider>
    );
};

export default ContactsProvider;