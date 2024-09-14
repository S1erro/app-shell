import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import UsersPage from "pages/UsersPage/UsersPage";
import RolesPage from "pages/RolesPage/RolesPage";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import ContactsPage from "pages/ContactsPage/ContactsPage";
import EditContactPage from "pages/EditContactPage/EditContactPage";
import VirtualMachinesListPage from "pages/VirtualMachinesListPage/VirtualMachinesListPage";
import CreateVirtualMachinePage from "pages/CreateVirtualMachinePage/CreateVirtualMachinePage";

const AppRouter = () => {
    return (
        <Routes>
            {/*<Route path="*" element={<ErrorPage />} />*/} // TODO: раскомментировать для использования не на gh-pages
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/create-edit/:id" element={<EditContactPage />} />
            <Route path="/virtual-machines" element={<VirtualMachinesListPage />} />
            <Route path="/create-machine/:id" element={<CreateVirtualMachinePage />} />
        </Routes>
    );
};

export default AppRouter;