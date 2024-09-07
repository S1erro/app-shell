
export enum StorageCapacityRange {
    min = 2,
    max = 192
}

export enum ServerOptions {
    'ru-central1-d',
    'ru-central2-d',
    'by-north1-d',
    'kz-west1-d'
}

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