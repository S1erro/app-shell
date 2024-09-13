import React from 'react';
import {Divider, Form, Input, Switch} from "antd";
import {dividerProps, FormItemRules} from "types";

const GenInfoFormSection = () => {
    return (
        <>
            <Divider {...dividerProps}>Общая информация</Divider>

            <Form.Item label={"Имя:"} name={"machineName"} rules={FormItemRules}>
                <Input placeholder="Введите имя"/>
            </Form.Item>

            <Form.Item
                label="Запустить ВМ после создания:"
                name="startAfterCreate"
                initialValue={false}
            >
                <Switch/>
            </Form.Item>
        </>
    );
};

export default GenInfoFormSection;