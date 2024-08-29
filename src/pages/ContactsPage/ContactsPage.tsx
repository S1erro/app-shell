import React, {ChangeEvent, useContext, useState} from 'react';
import {Button, Input, Layout, message, Modal, Select, Table} from "antd";
import {ContactsContext} from "providers/ContactsProvider/ContactsProvider"
import {Contact} from "types/interfaces/interfaces";
import ContactsTable from "../../components/ContactsTable/ContactsTable";

const categoryOptions = [
    {value: "Друг", label: "Друг"},
    {value: "Враг", label: "Враг"},
    {value: "Знакомый", label: "Знакомый"},
    {value: "", label: "Не выбрано"}
]

const ContactsPage = () => {
    const context = useContext(ContactsContext);

    const {addContact, editContact} = context!

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentContact, setCurrentContact] = useState<Contact | null>(null);
    const [editedContact, setEditedContact] = useState<Contact | null>(null);

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

    return (
        <Layout style={{padding: '24px'}}>
            <Button onClick={() => handleShowModal()}>Добавить</Button>

            <ContactsTable onShowModal={handleShowModal} />

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