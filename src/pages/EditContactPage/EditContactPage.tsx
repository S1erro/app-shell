import React, {useState} from 'react';
import {Button, Form, Input, Layout, Select} from "antd";
import {Category, Contact, Gender} from "types";
import {useParams, useNavigate} from "react-router-dom";
import cls from "./EditContactPage.module.css"
import {RootState} from "store/store";
import {useSelector} from "react-redux";
import {useContactActions} from "store/contactActions";


const categoryOptions = Object.values(Category).map(value => ({
    value: value,
    label: value || "Не выбрано"
}));

const genderOptions = Object.values(Gender).map(value => ({
    value: value,
    label: value || "Не выбрано"
}))

const EditContactPage = () => {
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const {handleAddContact, handleEditContact} = useContactActions();

    const navigate = useNavigate();

    const {id} = useParams<{ id: string }>();

    const contact = id
        ? contacts.find(contact => contact.id === Number(id))
        : undefined

    const [currentContact, setCurrentContact] = useState<Contact | undefined>(contact);
    const [editedContact, setEditedContact] = useState<Contact | undefined>(
        contact !== undefined ? contact : {name: "", email: "", phone: "", category: "", gender: "", id: Math.random()}
    );


    const handleInputChange = (key: keyof Contact, value: string) => {
        setEditedContact(prevState => prevState ? {...prevState, [key]: value} : undefined);
    };

    const handleSubmit = () => {
        if (currentContact && editedContact) {
            handleEditContact(currentContact.id, editedContact);
        } else if (editedContact) {
            handleAddContact(editedContact);
        }

        navigate("/contacts");
    }

    return (
        <Layout className={cls["layout"]}>
            <Form
                layout="horizontal"
                name="authorization_form"
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Введите имя"
                        }
                    ]}
                    initialValue={editedContact?.name}
                >
                    <Input
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        style={{marginBottom: '10px'}}
                    />
                </Form.Item>

                <Form.Item
                    label="Почта"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Введите почту"
                        }
                    ]}
                    initialValue={editedContact?.email}
                >
                    <Input
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        style={{marginBottom: '10px'}}
                        type="email"
                    />
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                    initialValue={editedContact?.phone}
                >
                    <Input
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        style={{marginBottom: '10px'}}
                        type="number"
                    />
                </Form.Item>

                <Form.Item
                    label="Категория"
                    name="category"
                    initialValue={editedContact?.category}
                >
                    <Select
                        options={categoryOptions}
                        onChange={(value) => handleInputChange('category', value)}
                        style={{marginBottom: '10px', width: '100%'}}
                    />
                </Form.Item>

                <Form.Item
                    label="Пол"
                    name="gender"
                    initialValue={editedContact?.gender}
                >
                    <Select
                        options={genderOptions}
                        onChange={(value) => handleInputChange('gender', value)}
                        style={{marginBottom: '10px', width: '100%'}}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 8}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width: "100%"}}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default EditContactPage;