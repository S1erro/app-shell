

export interface Contact {
    name: string;
    email: string;
    phone?: string;
    category?: string;
    gender?: string;
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