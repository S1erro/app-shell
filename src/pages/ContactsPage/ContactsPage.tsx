import React, {useContext, useState} from 'react';
import {Button, Checkbox, Col, Input, Layout, List, message, Modal, Select} from "antd";
import {ContactsContext} from "providers/ContactsProvider/ContactsProvider"
import {Contact} from "types/interfaces/interfaces";

const ContactsPage = () => {
    const context = useContext(ContactsContext);

    const {contacts, addContact, removeContact, editContact} = context!

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentContact, setCurrentContact] = useState<Contact | null>(null);
    const [editedContact, setEditedContact] = useState<Contact | null>(null);
    const [sortFilter, setSortFilter] = useState<string>(''); // Фильтр для сортировки
    const [findFilter, setFindFilter] = useState<string>(''); // Фильтр для поиска по буквам

    const showModal = (contact?: Contact) => {
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

    const handleFilterChange = (filterValue: string) => {
        setSortFilter(filterValue);
    }

    const filterContacts = (): Contact[] => {
        let filteredContacts = contacts.filter((contact) =>
            contact.email.includes(findFilter) || contact.name.includes(findFilter)
        );

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
                onChange={handleFilterChange}
                placeholder="Сортировка"
                options={[
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
                ]}
            />
            <Input
                placeholder="Поиск"
                onChange={(e) => setFindFilter(e.target.value)}
                value={findFilter}
            />
            <Button onClick={() => showModal()}>Добавить</Button>
            {/*<Input></Input>*/}
            <List
                dataSource={filterContacts()}
                renderItem={(contact: Contact) => (
                    <List.Item>
                        <Checkbox/>
                        <Col offset={1} span={3}>{contact.name}</Col>
                        <Col span={3}>{contact.email}</Col>
                        <Col span={3}>{contact.phone ? contact.phone : "-"}</Col>
                        <Col span={1}>{contact.category ? contact.category : "-"}</Col>
                        <Col span={1}>{contact.gender ? contact.gender : "-"}</Col>
                        <Button onClick={() => showModal(contact)}>
                            Изменить
                        </Button>
                        <Button onClick={() => removeContact(contact.email)}>
                            Удалить
                        </Button>
                    </List.Item>
                )}
            />
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
                    <Input
                        placeholder="Категория"
                        value={editedContact.category || ""}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        style={{marginBottom: '10px'}}
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