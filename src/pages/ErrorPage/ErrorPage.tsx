import React from 'react';
import {Button, Layout} from "antd";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <Layout>
            <h2>Ошибка 404, такой страницы не существует</h2>
            <Button style={{maxWidth: '450px'}}>
                <Link
                    to="/users"
                    style={{width:'100%'}}
                >
                    На главную
                </Link>
            </Button>
        </Layout>
    );
};

export default ErrorPage;