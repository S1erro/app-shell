import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Input, Space, Table} from "antd";
import {Contact} from "types";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useContactActions} from "store/contactActions";
import {selectContacts, selectIsLoading} from "store/contactsSelectors";
import {fetchedContacts} from "store/contactsSlice";
import {AppDispatch} from "store/store";

const ContactsTable = () => {
    const dispatch: AppDispatch = useDispatch();

    const contacts = useSelector(selectContacts);
    const isLoading = useSelector(selectIsLoading);
    const {handleRemoveContact} = useContactActions();

    useEffect(() => {
        if (!contacts.length && !isLoading) {
            dispatch(fetchedContacts());
        }
    }, []);

    const navigate = useNavigate();

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

    const handleNavigate = (record: Contact) => {
        navigate(`/create-edit/${record.id}`)
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
                <Space>
                    <Button
                        onClick={() => handleNavigate(record)}
                    >
                        Изменить
                    </Button>
                    <Button onClick={() => handleRemoveContact(record.id)}> Удалить </Button>
                </Space>
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