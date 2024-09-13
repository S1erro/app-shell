import React from 'react';
import {Button, Form, Layout,} from "antd";
import {CreateVMFormFields,} from "types";
import OperatingSystemFormSection from "components/OperatingSystemFormSection/OperatingSystemFormSection";
import ServerLocationFormSection from "components/ServerLocationFormSection/ServerLocationFormSection";
import DrivesCapacityFormSection from "components/DrivesCapacityFormSection/DrivesCapacityFormSection";
import ComputingResourcesFormSection from "components/ComputingResourcesFormSection/ComputingResourcesFormSection";
import NetworkSettingsFormSection from "components/NetworkSettingsFormSection/NetworkSettingsFormSection";
import AccessToMachineFormSection from "components/AccessToMachineFormSection/AccessToMachineFormSection";
import GenInfoFormSection from "components/GenInfoFormSection/GenInfoFormSection";

const CreateVirtualMachinePage = () => {

    const [form] = Form.useForm<CreateVMFormFields>();

    const handleSubmit = (values: CreateVMFormFields) => {
        console.log("Form Values: ", values);
    };

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
                <NetworkSettingsFormSection/>
                <AccessToMachineFormSection/>
                <GenInfoFormSection/>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default CreateVirtualMachinePage;
