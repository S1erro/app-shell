import React from 'react';
import {Layout, Menu} from "antd";
import AppRouter from "providers/router/AppRouter";
import {Link} from "react-router-dom";

const {Header, Sider, Content} = Layout;

const MainLayout = () => {
    const menuItems = [
        {
            key: 'users',
            label: <Link to="/users">Пользователи</Link>,
        },
        {
            key: 'roles',
            label: <Link to="/roles">Роли</Link>,
        },
        {
            key: 'profile',
            label: <Link to="/profile">Мой профиль</Link>,
        },
    ];

    return (
        <Layout className='main-layout'>
            <Header> </Header>

            <Layout>
                <Sider>
                    <Menu items={menuItems}/>
                </Sider>
                <Content>
                    <AppRouter />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;