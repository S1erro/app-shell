import React from 'react';
import {Divider, Form, Radio} from "antd";
import {dividerProps, FormItemRules, OperatingSystems} from "types";

const operatingSystems = Object.values(OperatingSystems);

const OperatingSystemFormSection = () => {
    return (
        <>
            <Divider {...dividerProps}>Расположение</Divider>
            <Form.Item label={"ОС:"} name={"operatingSystem"} rules={FormItemRules}>
                <Radio.Group>
                    {operatingSystems.map((os, index) => (
                        <Radio.Button key={index} value={os}>
                            {os}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>
        </>
    );
};

export default OperatingSystemFormSection;