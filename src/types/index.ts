
export enum ContactsStatus {
    'rejected',
    'idle',
    'pending',
    'fulfilled',
}

export interface ContactsState {
    contacts: Contact[];
    status: ContactsStatus;
}

export interface Contact {
    name: string;
    email: string;
    phone?: string;
    category?: string;
    gender?: string;
    id: number;
}

export enum Category {
    Friend = "Друг",
    Enemy = "Враг",
    Acquaintance = "Знакомый",
    Unselected = ""
}

export enum Gender {
    male = "Мужчина",
    female = "Женщина",
    unselected = ""
}