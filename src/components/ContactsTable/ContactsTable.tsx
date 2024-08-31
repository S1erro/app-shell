import React, {ChangeEvent, FC, useContext, useState} from 'react';
import {Button, Input, Layout, Table} from "antd";
import {Contact} from "types";
import {ContactsContext} from "providers/ContactsProvider/ContactsProvider";
import {Link} from "react-router-dom";

const ContactsTable = () => {
    const context = useContext(ContactsContext);

    const {contacts, removeContact} = context!

    const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: 'ascend' | 'descend' | null }>({
        columnKey: '',
        order: null,
    });
    const [textToFindName, setTextToFindName] = useState<string>('');
    const [textToFindEmail, setTextToFindEmail] = useState<string>('');

    const handleChangeNameSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const currValue = e.target.value;
        setTextToFindName(currValue);
    };

    const handleChangeEmailSeacrh = (e: ChangeEvent<HTMLInputElement>) => {
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
                    onChange={handleChangeEmailSeacrh}
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
            title: "Действие",
            dataIndex: "",
            key: "action",
            render: (record: Contact) =>
                <Layout>
                    <Button>
                        <Link
                            to={`/create-edit/${record.email}`}
                            style={{width: "100%", height: "100%"}}
                        >
                            Изменить
                        </Link>
                    </Button>
                    <Button onClick={() => removeContact(record.email)}> Удалить </Button>
                </Layout>
        },
    ]

    return (
        <Table
            dataSource={contacts
                .filter(contact => contact.name.includes(textToFindName))
                .filter(contact => contact.email.includes(textToFindEmail))
                .map(contact => ({...contact, key: contact.email}))
            }
            columns={tableColumns}
            onChange={handleTableChange}

        />
    );
};

export default ContactsTable;