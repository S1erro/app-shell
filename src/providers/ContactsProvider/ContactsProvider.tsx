import React, {useState, createContext, FC, ReactNode, useEffect} from 'react';
import {Contact} from "types/interfaces/interfaces";
import contactsData from "./contacts.json"

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

const fetchContacts = async (): Promise<Contact[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contactsData as Contact[]);
        }, 1000);
    });
};

const ContactsProvider: FC<ContactsProviderProps> = ({children}) => {

    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const loadContacts = async () => {
            const fetchedContacts = await fetchContacts();
            setContacts(fetchedContacts);
        };

        loadContacts();
    }, []);

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