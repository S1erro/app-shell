import React, {useContext, useState} from 'react';
import {Button, Input, Layout, message, Modal, Select} from "antd";
import {ContactsContext} from "providers/ContactsProvider/ContactsProvider"
import {Contact} from "types/interfaces/interfaces";
import ContactsList from "components/ContactsList/ContactsList";

const filterOptions = [
    {
        value: "name",
        label: "По имени"
    },
    {
        value: "email",
        label: "По почте"
    },
    {
        value: "",
        label: "Без фильтра"
    }
]

const categoryOptions = [
    {
        value: "Друг",
        label: "Друг"
    },
    {
        value: "Враг",
        label: "Враг"
    },
    {
        value: "Знакомый",
        label: "Знакомый"
    },
    {
        value: "",
        label: "Не выбрано"
    }
]

const ContactsPage = () => {
    const context = useContext(ContactsContext);

    const {contacts, addContact, removeContact, editContact} = context!

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentContact, setCurrentContact] = useState<Contact | null>(null);
    const [editedContact, setEditedContact] = useState<Contact | null>(null);
    const [sortFilter, setSortFilter] = useState<string>(''); // Фильтр для сортировки
    const [findFilter, setFindFilter] = useState<string>(''); // Фильтр для поиска по буквам
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const handleShowModal = (contact?: Contact) => {
        if (contact) {
            setCurrentContact(contact);
            setEditedContact(contact);
        } else {
            setCurrentContact(null);
            setEditedContact({name: "", email: "", phone: "", category: "", gender: ""});
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!editedContact?.name || !editedContact?.email) {
            message.error("Имя и Email не могут быть пустыми.");
            return;
        }
        if (currentContact && editedContact) {
            editContact(currentContact.email, editedContact);
        } else if (editedContact) {
            addContact(editedContact);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (key: keyof Contact, value: string) => {
        setEditedContact(prevState => prevState ? {...prevState, [key]: value} : null);
    };

    const handleSortFilterChange = (filterValue: string) => {
        setSortFilter(filterValue);
    }

    const handleCategoryFilterChange = (filterValue: string) => {
        setCategoryFilter(filterValue);
    }

    const handleFilterContacts = (): Contact[] => {
        let filteredContacts = contacts
            .filter((contact) => contact.email.includes(findFilter) || contact.name.includes(findFilter))

        if (categoryFilter) {
            filteredContacts = filteredContacts.filter((contact) => contact.category === categoryFilter);
        }

        if (sortFilter === "name") {
            filteredContacts = filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortFilter === "email") {
            filteredContacts = filteredContacts.sort((a, b) => a.email.localeCompare(b.email));
        }

        return filteredContacts;
    }

    return (
        <Layout style={{padding: '24px'}}>
            <Select
                onChange={handleSortFilterChange}
                placeholder="Сортировка"
                options={filterOptions}
            />
            <Select
                onChange={handleCategoryFilterChange}
                placeholder="Категория"
                options={categoryOptions}
            />
            <Input
                placeholder="Поиск"
                onChange={(e) => setFindFilter(e.target.value)}
                value={findFilter}
            />
            <Button onClick={() => handleShowModal()}>Добавить</Button>
            <ContactsList filterContacts={handleFilterContacts} showModal={handleShowModal} />

            {editedContact && (
                <Modal
                    title="Редактирование контакта"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Input
                        placeholder="Имя"
                        value={editedContact.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        style={{marginBottom: '10px'}}
                    />
                    <Input
                        placeholder="Email"
                        value={editedContact.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        style={{marginBottom: '10px'}}
                    />
                    <Input
                        placeholder="Телефон"
                        value={editedContact.phone || ""}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        style={{marginBottom: '10px'}}
                    />
                    <Select
                        placeholder="Категория"
                        options={categoryOptions}
                        value={editedContact.category || ""}
                        onChange={(value) => handleInputChange('category', value)}
                        style={{marginBottom: '10px', width: '100%'}}
                    />
                    <Input
                        placeholder="Пол"
                        value={editedContact.gender || ""}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        style={{marginBottom: '10px'}}
                    />
                </Modal>
            )}
        </Layout>
    );
};

export default ContactsPage;