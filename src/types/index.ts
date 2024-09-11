import React from "react";

export interface ApiResponse<T, N> {
    status: string;
    metaresponse: MetaResponse<T, N>;
}

export interface MetaResponse<T, N> {
    data: T[]
    info?: N
    meta: {
        totalAmount: number
    }
}

export interface TodoRequest {
    title?: string;
    isdone?: boolean;  // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
    id: number;
    title: string;
    isdone: boolean;
    created: string;
}

export interface TodoInfo {
    all: number
    completed: number
    inwork: number
}

export enum Filter {
    all = 'all',
    inwork = 'inwork',
    completed = 'completed',
}

export interface TasksProps {
    tasks: Todo[],
    setTasks: React.Dispatch<React.SetStateAction<Todo[]>>
}

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