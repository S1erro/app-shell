import React from 'react';
import {Route, Routes} from "react-router-dom";
import UsersPage from "pages/UsersPage/UsersPage";
import RolesPage from "pages/RolesPage/RolesPage";
import ProfilePage from "pages/ProfilePage/ProfilePage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
};

export default AppRouter;