import React, {useState} from 'react';
import {Divider, Form, Input, Radio} from "antd";
import {dividerProps, FormItemRules} from "types";

const NetworkSettingsFormSection = () => {

    const [isManualPrivateIP, setIsManualPrivateIP] = useState(false);
    const [isManualPublicIP, setIsManualPublicIP] = useState(false);

    return (
        <>
            <Divider {...dividerProps}>Сетевые настройки</Divider>

            <Form.Item label={"Публичный адрес:"} name={"public_ip"} initialValue={"auto"}>
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
                    name="public_ip"
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

            <Form.Item label="Внутренний адрес:" name="private_ip" initialValue={"auto"}>
                <Radio.Group
                    onChange={(e) => setIsManualPrivateIP(e.target.value === '')}
                >
                    <Radio.Button value="auto">Автоматически</Radio.Button>
                    <Radio.Button value="">Вручную</Radio.Button>
                </Radio.Group>
            </Form.Item>

            {isManualPrivateIP && (
                <Form.Item
                    name="private_ip"
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