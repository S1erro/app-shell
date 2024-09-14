import React, {useEffect} from 'react';
import {Button, Form, Layout, Space,} from "antd";
import {VirtualMachine} from "types";
import OperatingSystemFormSection from "components/OperatingSystemFormSection/OperatingSystemFormSection";
import ServerLocationFormSection from "components/ServerLocationFormSection/ServerLocationFormSection";
import DrivesCapacityFormSection from "components/DrivesCapacityFormSection/DrivesCapacityFormSection";
import ComputingResourcesFormSection from "components/ComputingResourcesFormSection/ComputingResourcesFormSection";
import NetworkSettingsFormSection from "components/NetworkSettingsFormSection/NetworkSettingsFormSection";
import AccessToMachineFormSection from "components/AccessToMachineFormSection/AccessToMachineFormSection";
import GenInfoFormSection from "components/GenInfoFormSection/GenInfoFormSection";
import {useNavigate, useParams} from "react-router-dom";
import {useVirtualMachinesActions} from "store/VirtualMachines/virtualMachineActions";
import {useSelector} from "react-redux";
import {selectVirtualMachines} from "store/VirtualMachines/virtualMachinesSelectors";

const CreateVirtualMachinePage = () => {

    const virtualMachines = useSelector(selectVirtualMachines)

    const navigate = useNavigate();
    const [form] = Form.useForm<VirtualMachine>();
    const {handleAddVirtualMachine, handleEditVirtualMachine} = useVirtualMachinesActions();

    const {id} = useParams<{ id: string }>();

    const handleSubmit = (values: VirtualMachine) => {
        if (Number(id)) {
            values.id = Number(id);
            handleEditVirtualMachine(Number(id), values);
        } else {
            values.id = Math.random()
            handleAddVirtualMachine(values);
        }
        navigate("/virtual-machines")
    };

    const handleCancel = () => {
        navigate("/virtual-machines")
    }

    if (Number(id)) {
        const VM = virtualMachines.virtualMachines.find(machine => machine.id === Number(id));
        form.setFieldsValue({...VM})
    }

    return (
        <Layout style={{padding: "2rem"}}>
            <Form
                form={form}
                wrapperCol={{span: 10}}
                labelCol={{span: 4}}
                labelAlign={"left"}
                layout="horizontal"
                onFinish={handleSubmit}
            >
                <OperatingSystemFormSection/>
                <ServerLocationFormSection/>
                <DrivesCapacityFormSection/>
                <ComputingResourcesFormSection form={form}/>
                <NetworkSettingsFormSection form={form}/>
                <AccessToMachineFormSection/>
                <GenInfoFormSection/>

                <Space>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {Number(id) ? "Изменить" : "Создать"}
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={handleCancel}>
                            Отмена
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </Layout>
    );
};

export default CreateVirtualMachinePage;
