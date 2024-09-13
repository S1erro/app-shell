import React, {useState} from 'react';
import {Button, Layout} from "antd";
import {useNavigate} from "react-router-dom";
import {CreateVMFormFields} from "types";

const VirtualMachinesListPage = () => {
    const navigate = useNavigate();

    const [virtualMachines, setVirtualMachines] = useState<CreateVMFormFields[]>([]);

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