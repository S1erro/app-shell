import {Contact} from 'types';
import {Input, Button, Space} from 'antd';
import React from "react";

interface TableColumnProps {
    sortedInfo: any;
    textToFindName: string;
    textToFindEmail: string;
    handleChangeNameSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeEmailSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNavigate: (id: number) => void;
    handleRemoveContact: (id: number) => void;
}

export const getTableColumns = ({
                                    sortedInfo,
                                    textToFindName,
                                    textToFindEmail,
                                    handleChangeNameSearch,
                                    handleChangeEmailSearch,
                                    handleNavigate,
                                    handleRemoveContact,
                                }: TableColumnProps) => [
    {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        sorter: (a: Contact, b: Contact) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
        filterDropdown: () => (
            <Input.Search
                placeholder="Введите текст"
                value={textToFindName}
                onChange={handleChangeNameSearch}
            />
        )
    },
    {
        title: "Почта",
        dataIndex: "email",
        key: "email",
        sorter: (a: Contact, b: Contact) => a.email.localeCompare(b.email),
        sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
        filterDropdown: () => (
            <Input.Search
                placeholder="Введите текст"
                value={textToFindEmail}
                onChange={handleChangeEmailSearch}
            />
        )
    },
    {
        title: "Телефон",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Категория",
        dataIndex: "category",
        key: "category",
        filters: [
            {
                text: "Враги",
                value: "Враг"
            },
            {
                text: "Друзья",
                value: "Друг"
            },
            {
                text: "Знакомые",
                value: "Знакомый"
            },
            {
                text: "Не указано",
                value: "noCategory"
            }
        ],
        onFilter: (value: any, record: Contact) => {
            if (!record.category && value === "noCategory") {
                return true;
            }

            if (record.category && value === "noCategory") {
                return false;
            }

            if (record.category && value !== "noCategory") {
                return record.category.includes(value);
            }
            return false;
        },
    },
    {
        title: "Пол",
        dataIndex: "gender",
        key: "gender",
    },
    {
        title: "Действие",
        dataIndex: "",
        key: "action",
        render: (record: Contact) => (
            <Space>
                <Button onClick={() => handleNavigate(record.id)}>
                    Изменить
                </Button>
                <Button onClick={() => handleRemoveContact(record.id)}>
                    Удалить
                </Button>
            </Space>
        )
    },
];
