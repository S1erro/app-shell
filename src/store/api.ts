import {Contact} from "types";
import contactsData from "./Contacts/contacts.json";

export const fetchContacts = async (): Promise<Contact[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contactsData as Contact[]);
        }, 1000);
    });
};

