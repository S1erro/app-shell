import React, {ChangeEvent, FC, useContext, useState} from 'react';
import {Button, Input, Table} from "antd";
import {Contact} from "types/interfaces/interfaces";
import {ContactsContext} from "providers/ContactsProvider/ContactsProvider";

interface Props {
    onShowModal: (contact: Contact) => void;
}

const ContactsTable: FC<Props> = ({onShowModal}) => {
    const context = useContext(ContactsContext);

    const {contacts, removeContact} = context!

    const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: 'ascend' | 'descend' | null }>({
        columnKey: '',
        order: null,
    });
    const [textToFindName, setTextToFindName] = useState<string>('');
    const [textToFindEmail, setTextToFindEmail] = useState<string>('');

    const handleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const currValue = e.target.value;
        setTextToFindName(currValue);
    };

    const handleSearchEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const currValue = e.target.value;
        setTextToFindEmail(currValue);
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo({
            columnKey: sorter.columnKey,
            order: sorter.order,
        })
    }

    const tableColumns = [
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
                    onChange={handleSearchName}
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
                    onChange={handleSearchEmail}
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
                    return true
                }

                if (record.category && value === "noCategory") {
                    return false
                }

                if (record.category && value !== "noCategory") {
                    return record.category.includes(value)
                }
                return false
            },
        },
        {
            title: "Пол",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Изменить",
            dataIndex: "",
            key: "edit",
            render: (record: Contact) => <Button onClick={() => onShowModal(record)}> Изменить </Button>
        },
        {
            title: "Удалить",
            dataIndex: "",
            key: "delete",
            render: (record: Contact) => <Button onClick={() => removeContact(record.email)}> Удалить </Button>
        }
    ]

    return (
        <Table
            dataSource={contacts
                .filter(contact => contact.name.includes(textToFindName))
                .filter(contact => contact.email.includes(textToFindEmail))
            }
            columns={tableColumns}
            onChange={handleTableChange}
        />
    );
};

export default ContactsTable;