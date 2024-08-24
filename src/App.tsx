import React, {useState} from 'react';
import './App.css';
import AuthorizationPage from "pages/AuthorizationPage/AuthorizationPage";
import {Layout} from "antd";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {

    const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem("currentUser"));

    return (
        <Layout className="App">
            {currentUser === null
                ? <AuthorizationPage setCurrentUser={setCurrentUser} />
                : <MainLayout />}
        </Layout>
    );
}

export default App;
