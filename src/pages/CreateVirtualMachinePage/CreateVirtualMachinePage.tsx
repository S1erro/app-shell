import React, {useState} from 'react';
import {Button, Divider, Form, Input, InputNumber, Layout, Select, Slider} from "antd";
import {ServerOptions, StorageCapacityRange} from "types";

const dividerProps: {
    orientation: "left" | "right" | "center";
    orientationMargin: string;
} = {
    orientation: "left",
    orientationMargin: "0"
};

const CreateVirtualMachinePage = () => {

    const [storageCapacity, setStorageCapacity] = useState<number>(2);

    const handleCapacityChange = (capacity: number) => {
        setStorageCapacity(capacity);
    }

    const options = (Object.keys(ServerOptions) as Array<keyof typeof ServerOptions>)
        .filter(key => !isNaN(Number(key)))
        .map((key) => {
            return {
                value: ServerOptions[key],
                label: ServerOptions[key]
            }
        })

    return (
        <Layout style={{padding: "2rem"}}>
            <Form wrapperCol={{span: 6}} layout="vertical">

                <Form.Item>
                    <Divider {...dividerProps}>Расположение</Divider>
                </Form.Item>

                <Form.Item
                    label="Зона доступности"
                    name="server"
                >
                    <Select
                        defaultValue={options[0]}
                        options={options}
                    />
                </Form.Item>

                <Form.Item>
                    <Divider {...dividerProps}>Диски и файловые хранилища</Divider>
                </Form.Item>

                <Form.Item>
                    <Slider
                        min={StorageCapacityRange.min}
                        max={StorageCapacityRange.max}
                        value={storageCapacity}
                        onChange={(e) => handleCapacityChange(e)}
                    />

                    <InputNumber
                        min={StorageCapacityRange.min}
                        max={StorageCapacityRange.max}
                        value={Math.round(storageCapacity)}
                        onChange={(e) => handleCapacityChange(e || storageCapacity)}
                    />

                </Form.Item>

                <Form.Item>
                    <Divider {...dividerProps}>Вычислительные ресурсы</Divider>
                </Form.Item>

                <Form.Item>
                    <Divider {...dividerProps}>Общая информация</Divider>
                </Form.Item>

                <Form.Item
                    label="Название:"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Введите название",
                        }
                    ]}
                >
                    <Input
                        placeholder="Введите название"
                    />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 2, span: 6}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width: "100%"}}
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default CreateVirtualMachinePage;