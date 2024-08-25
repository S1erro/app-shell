import React from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

const MainMenu = () => {
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
        <Menu items={menuItems}/>
    );
};

export default MainMenu;