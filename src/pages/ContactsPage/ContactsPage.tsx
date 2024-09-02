import React from 'react';
import {Button, Layout} from "antd";
import ContactsTable from "components/ContactsTable/ContactsTable";
import {useNavigate} from "react-router-dom";

const ContactsPage = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/create-edit/:id");
    }

    return (
        <Layout style={{padding: '24px'}}>
            <Button
                onClick={handleNavigate}
            >
                    Добавить
            </Button>

            <ContactsTable />

        </Layout>
    );
};

export default ContactsPage;