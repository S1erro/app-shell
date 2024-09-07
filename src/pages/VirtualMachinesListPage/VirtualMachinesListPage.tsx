import React, {useState} from 'react';
import {Button, Layout} from "antd";
import {useNavigate} from "react-router-dom";

interface VirtualMachine {

}

const VirtualMachinesListPage = () => {
    const navigate = useNavigate();

    const [virtualMachines, setVirtualMachines] = useState<VirtualMachine>([]);

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