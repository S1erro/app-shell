import React from 'react';
import {Divider, Form, Select} from "antd";
import {dividerProps, FormItemRules, ServerOptions} from "types";

const serverLocationOptions = (Object.keys(ServerOptions) as Array<keyof typeof ServerOptions>)
    .filter(key => !isNaN(Number(key)))
    .map((key) => {
        return {
            value: ServerOptions[key],
            label: ServerOptions[key]
        };
    });

const ServerLocationFormSection = () => {
    return (
        <>
            <Divider {...dividerProps}>Расположение</Divider>

            <Form.Item label={"Зона доступности:"} name={"serverLocation"} rules={FormItemRules}>
                <Select placeholder="Выберите зону доступности" options={serverLocationOptions}/>
            </Form.Item>
        </>
    );
};

export default ServerLocationFormSection;