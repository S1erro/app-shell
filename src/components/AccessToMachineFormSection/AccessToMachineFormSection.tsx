import React from 'react';
import {Divider, Form, Input} from "antd";
import {dividerProps, FormItemRules} from "types";

const {TextArea} = Input;

const AccessToMachineFormSection = () => {
    return (
        <>
            <Divider {...dividerProps}>Доступ</Divider>

            <Form.Item
                label={"Введите SHH ключ:"}
                name={"sshKey"}
                rules={[...FormItemRules,
                    {
                        pattern: new RegExp(
                            /^(ssh-rsa|ssh-ed25519)/
                        ),
                        message: 'SSH должен начинаться с \'ssh-rsa\', \'ssh-ed25519\''
                    }
                ]}

            >
                <TextArea placeholder={"Открытый ключ. Должен начинаться с 'ssh-rsa', 'ssh-ed25519'"}/>
            </Form.Item>
        </>
    );
};

export default AccessToMachineFormSection;