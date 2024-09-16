import React, {FC, useState} from 'react';
import {Button, Col, Divider, Form, FormInstance, Layout, Row, Tabs} from "antd";
import {VirtualMachine, dividerProps, FormItemRules, HighCoreConfig, HighMemoryConfig, StandardConfig} from "types";

const standardConfigurations = Object.values(StandardConfig);
const highMemoryConfigurations = Object.values(HighMemoryConfig);
const highCoreConfigurations = Object.values(HighCoreConfig);

interface Props {
    form: FormInstance<VirtualMachine>
}

const ComputingResourcesFormSection: FC<Props> = ({form}) => {

    const [selectedConfig, setSelectedConfig] = useState<string>(form.getFieldValue('machineConfiguration') || '');

    const handleSelectConfig = (config?: string) => {
        if (config) {
            setSelectedConfig(config);
            form.setFieldsValue({machineConfiguration: config});
        } else {
            setSelectedConfig('');
            form.setFieldsValue({machineConfiguration: undefined});
        }
    };

    const tabItems = [
        {
            label: 'Standard',
            key: '1',
            children: (
                <Row gutter={[16, 16]}>
                    {standardConfigurations.map((config, index) => (
                        <Col key={index} span={10}>
                            <Button
                                type={selectedConfig === config ? 'primary' : 'default'}
                                onClick={() => handleSelectConfig(config)}
                                block
                            >
                                {config}
                            </Button>
                        </Col>
                    ))}
                </Row>
            )
        },
        {
            label: 'High memory',
            key: '2',
            children: (
                <Row gutter={[16, 16]}>
                    {highMemoryConfigurations.map((config, index) => (
                        <Col key={index} span={10}>
                            <Button
                                type={selectedConfig === config ? 'primary' : 'default'}
                                onClick={() => handleSelectConfig(config)}
                                block
                            >
                                {config}
                            </Button>
                        </Col>
                    ))}
                </Row>
            )
        },
        {
            label: 'HighCore CPU',
            key: '3',
            children: (
                <Row gutter={[16, 16]}>
                    {highCoreConfigurations.map((config, index) => (
                        <Col key={index} span={10}>
                            <Button
                                type={selectedConfig === config ? 'primary' : 'default'}
                                onClick={() => handleSelectConfig(config)}
                                block
                            >
                                {config}
                            </Button>
                        </Col>
                    ))}
                </Row>
            )
        }
    ];

    return (
        <>
            <Divider {...dividerProps}>Вычислительные ресурсы</Divider>

            <Form.Item label="Конфигурация:" name={"machineConfiguration"} rules={FormItemRules}>
                <Layout>{selectedConfig}</Layout>
            </Form.Item>

            <Tabs items={tabItems} onChange={() => handleSelectConfig()}/>
        </>
    );
};

export default ComputingResourcesFormSection;