import React, {FC, useState} from 'react';
import {Divider, Form, FormInstance, Input, Radio} from "antd";
import {dividerProps, FormItemRules, VirtualMachine} from "types";

interface Props {
    form: FormInstance<VirtualMachine>
}

const NetworkSettingsFormSection: FC<Props> = ({form}) => {
    const isPrivateIP = form.getFieldValue('privateIP')
    const isPublicIP = form.getFieldValue('publicIP')

    const [isManualPrivateIP, setIsManualPrivateIP] = useState(!isNaN(parseFloat(isPrivateIP)));
    const [isManualPublicIP, setIsManualPublicIP] = useState(!isNaN(parseFloat(isPublicIP)));

    console.log("PRIVATE",isPrivateIP);
    console.log("PUBLIC",isPublicIP);

    return (
        <>
            <Divider {...dividerProps}>Сетевые настройки</Divider>

            <Form.Item label={"Публичный адрес:"} name={"publicIP"} initialValue={"auto"}>
                <Radio.Group
                    onChange={(e) => setIsManualPublicIP(e.target.value === '')}
                >
                    <Radio.Button value="auto">Автоматически</Radio.Button>
                    <Radio.Button value="">Вручную</Radio.Button>
                    <Radio.Button value="no_ip">Без адреса</Radio.Button>
                </Radio.Group>
            </Form.Item>

            {isManualPublicIP && (
                <Form.Item
                    name="publicIP"
                    label="Введите IP:"
                    rules={[...FormItemRules,
                        {
                            pattern: new RegExp(
                                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                            ),
                            message: 'Введите корректный IP-адрес!'
                        }
                    ]}
                >
                    <Input placeholder="Введите IP"/>
                </Form.Item>
            )}

            <Form.Item label="Внутренний адрес:" name="privateIP" initialValue={"auto"}>
                <Radio.Group
                    onChange={(e) => setIsManualPrivateIP(e.target.value === '')}
                >
                    <Radio.Button value="auto">Автоматически</Radio.Button>
                    <Radio.Button value="">Вручную</Radio.Button>
                </Radio.Group>
            </Form.Item>

            {(isManualPrivateIP)&& (
                <Form.Item
                    name="privateIP"
                    label="Введите IP:"
                    rules={[...FormItemRules,
                        {
                            pattern: new RegExp(
                                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                            ),
                            message: 'Введите корректный IP-адрес!'
                        }
                    ]}
                >
                    <Input placeholder="Введите IP"/>
                </Form.Item>
            )}
        </>
    );
};

export default NetworkSettingsFormSection;