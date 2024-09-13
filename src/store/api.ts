import {Contact, VirtualMachine} from "types";
import contactsData from "./Contacts/contacts.json";
import machinesData from "./VirtualMachines/virtualMachines.json";

export const fetchContacts = async (): Promise<Contact[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contactsData as Contact[]);
        }, 1000);
    });
};

export const fetchVirtualMachines = async (): Promise<VirtualMachine[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(machinesData as VirtualMachine[]);
        }, 1000);
    });
};

