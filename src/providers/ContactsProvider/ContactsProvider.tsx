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
            name: "Димас Донской",
            email: "Dimon2012@mail.ru",
            phone: "89214212314",
            category: "Враг",
            gender: "Муж."
        },
        {
            name: "Гребень Пушистый",
            email: "AkulaMonster@shark.com",
            phone: "89214122314",
            category: "Друг",
            gender: "Жен."
        },
        {
            name: "Оливье Прошлогодний",
            email: "oliveHero@mail.ru",
            phone: "89214291814",
            category: "Знакомый",
        },
        {
            name: "Пластырь Позорный",
            email: "pozner@gmail.com",
            category: "Друг",
            gender: "Муж."
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