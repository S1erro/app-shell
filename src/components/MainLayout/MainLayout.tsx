import React from 'react';
import {Layout} from "antd";
import AppRouter from "providers/router/AppRouter";
import MainMenu from "components/MainMenu/MainMenu";

const {Sider, Content} = Layout;

const MainLayout = () => {

    return (
        <Layout className='main-layout'>
            <Layout>
                <Sider>
                    <MainMenu />
                </Sider>
                <Content>
                    <AppRouter />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;