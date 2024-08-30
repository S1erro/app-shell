import React from 'react';
import {Button, Layout} from "antd";
import ContactsTable from "components/ContactsTable/ContactsTable";
import {Link} from "react-router-dom";

const ContactsPage = () => {
    return (
        <Layout style={{padding: '24px'}}>
            <Button>
                <Link
                    to="/create-edit/:contactEmail"
                    style={{width: "100%", height: "100%"}}
                >
                    Добавить
                </Link>
            </Button>

            <ContactsTable />

        </Layout>
    );
};

export default ContactsPage;