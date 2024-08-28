import React, {FC, useContext} from 'react';
import {Contact} from "../../types/interfaces/interfaces";
import {Button, Checkbox, Col, List} from "antd";
import {ContactsContext} from "../../providers/ContactsProvider/ContactsProvider";

interface Props {
    filterContacts: () => Contact[];
    showModal: (contact?: Contact) => void;
}

const ContactsList: FC<Props> = ({filterContacts, showModal}) => {
    const context = useContext(ContactsContext);

    const {removeContact} = context!;

    return (
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
    );
};

export default ContactsList;