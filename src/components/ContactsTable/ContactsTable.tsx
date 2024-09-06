import React, {ChangeEvent, useEffect, useState} from 'react';
import {Table} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useContactActions} from "store/contactActions";
import {selectContacts} from "store/contactsSelectors";
import {fetchedContacts} from "store/contactsSlice";
import {AppDispatch} from "store/store";
import {getTableColumns} from "./const";

const ContactsTable = () => {
    const dispatch: AppDispatch = useDispatch();

    const {contacts, status} = useSelector(selectContacts);
    const {handleRemoveContact} = useContactActions();

    useEffect(() => {
        if (status.isLoading) {
            dispatch(fetchedContacts());
        }
    }, [status, dispatch]);

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

    const handleChangeEmailSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const currValue = e.target.value;
        setTextToFindEmail(currValue);
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo({
            columnKey: sorter.columnKey,
            order: sorter.order,
        })
    }

    const handleNavigate = (id: number) => {
        navigate(`/create-edit/${id}`)
    }

    const tableColumns = getTableColumns({
        sortedInfo,
        textToFindName,
        textToFindEmail,
        handleChangeNameSearch,
        handleChangeEmailSearch,
        handleNavigate,
        handleRemoveContact,
    });

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