import React from 'react';
import {Button, Layout} from "antd";
import {useNavigate} from "react-router-dom";

const VirtualMachinesListPage = () => {
    const navigate = useNavigate();

    const handleCreateVirtualMachine = () => {
        navigate("/create-machine");
    }

    return (
        <Layout>
            <Button onClick={handleCreateVirtualMachine}>
                Создать ВМ
            </Button>
        </Layout>
    );
};

export default VirtualMachinesListPage;