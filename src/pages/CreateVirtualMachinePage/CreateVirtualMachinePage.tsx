import React, {useState} from 'react';
import {Button, Checkbox, Col, Divider, Form, Input, InputNumber, Layout, Row, Select, Slider, Space, Tabs} from "antd";
import {
    HighCoreConfig,
    HighMemoryConfig,
    OperatingSystems, PrivateIPs, PublicIPs,
    ServerOptions,
    StandardConfig,
    StorageCapacityRange
} from "types";

const standardConfigurations = Object.values(StandardConfig);
const highMemoryConfigurations = Object.values(HighMemoryConfig);
const highCoreConfigurations = Object.values(HighCoreConfig);
const operatingSystems = Object.values(OperatingSystems);
const publicIPs = Object.values(PublicIPs);
const privateIPs = Object.values(PrivateIPs);

const dividerProps: {
    orientation: "left" | "right" | "center";
    orientationMargin: string;
} = {
    orientation: "left",
    orientationMargin: "0"
};

const options = (Object.keys(ServerOptions) as Array<keyof typeof ServerOptions>)
    .filter(key => !isNaN(Number(key)))
    .map((key) => {
        return {
            value: ServerOptions[key],
            label: ServerOptions[key]
        }
    })


const {TabPane} = Tabs;
const {TextArea} = Input;

const CreateVirtualMachinePage = () => {

    const [storageCapacities, setStorageCapacities] = useState<number[]>([]);
    const [selectedConfig, setSelectedConfig] = useState<string | null>(
        standardConfigurations[0] ||
        highMemoryConfigurations[0] ||
        highCoreConfigurations[0] ||
        null
    );
    const [selectedOS, setSelectedOS] = useState<string | null>(operatingSystems[0] || null);
    const [machineName, setMachineName] = useState<string | null>(null);
    const [inputSSH, setInputSSH] = useState<string | null>(null);
    const [startAfterCreate, setStartAfterCreate] = useState<boolean>(false);
    const [publicIP, setPublicIP] = useState<string>(publicIPs[0] || '');
    const [privateIP, setPrivateIP] = useState<string>(privateIPs[0] || '');

    const handleSelectOS = (os: string) => {
        setSelectedOS(os);
    }

    const handleSelectConfig = (config: string) => {
        setSelectedConfig(config);
    };

    const handleCapacityChange = (capacity: number, index: number) => {
        const newCapacities = [...storageCapacities];
        newCapacities[index] = capacity;
        setStorageCapacities(newCapacities);
    };

    const handleAddDrive = () => {
        if (storageCapacities.length < 3) {
            setStorageCapacities([...storageCapacities, StorageCapacityRange.min]);
        }
    };

    const handleRemoveDrive = (index: number) => {
        const newCapacities = storageCapacities.filter((_, i) => i !== index);
        setStorageCapacities(newCapacities);
    };

    const handleChangeSSHKey = (key: string) => {
        setInputSSH(key);
    }

    const handleChangeMachineName = (name: string) => {
        setMachineName(name);
    }

    const handleChangeStartAfterCreate = (startAfterCreate: boolean) => {
        setStartAfterCreate(startAfterCreate);
    }

    const handleChangePublicIP = (ip: string) => {
        setPublicIP(ip);
    }

    const handleChangePrivateIP = (ip: string) => {
        setPrivateIP(ip);
    }

    return (
        <Layout style={{padding: "2rem"}}>
            <Form
                wrapperCol={{span: 8}}
                labelCol={{span: 4}}
                labelAlign={"left"}
                layout="horizontal"
            >

                <Form.Item
                    label={"ОС:"}
                    name={"operating_system"}
                >
                    <Space.Compact size="middle">
                        {operatingSystems.map((os, index) => (
                            <Button
                                key={index}
                                type={selectedOS === os ? 'primary' : 'default'}
                                onClick={() => handleSelectOS(os)}
                            >
                                {os}
                            </Button>
                        ))}
                    </Space.Compact>
                </Form.Item>

                <Divider {...dividerProps}>Расположение</Divider>

                <Form.Item
                    label="Зона доступности"
                    name="server"
                >
                    <Select
                        defaultValue={options[0]}
                        options={options}
                    />
                </Form.Item>

                <Divider {...dividerProps}>Диски и файловые хранилища</Divider>

                <Form.Item name={"add_drive"} label={"Диски:"}>
                    <Button
                        onClick={handleAddDrive}
                        disabled={storageCapacities.length >= 3}
                    >
                        Добавить диск
                    </Button>
                </Form.Item>

                {storageCapacities.map((capacity, index) => (
                    <Form.Item
                        key={index}
                        label={`Размер диска ${index + 1} (Гб):`}
                        name={`drive_capacity_${index}`}
                    >
                        <Slider
                            min={StorageCapacityRange.min}
                            max={StorageCapacityRange.max}
                            value={capacity}
                            onChange={(value) => handleCapacityChange(value, index)}
                        />
                        <InputNumber
                            min={StorageCapacityRange.min}
                            max={StorageCapacityRange.max}
                            value={Math.round(capacity)}
                            onChange={(value) => handleCapacityChange(value || capacity, index)}
                        />
                        {storageCapacities.length > 0 && (
                            <Button
                                onClick={() => handleRemoveDrive(index)}
                                style={{marginTop: '10px'}}
                            >
                                Удалить диск
                            </Button>
                        )}
                    </Form.Item>
                ))}

                <Divider {...dividerProps}>Вычислительные ресурсы</Divider>

                <Form.Item
                    label={"Конфигурация:"}
                    name={"config"}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Standard" key="1">
                            <Row gutter={[16, 16]}>
                                {standardConfigurations.map((config, index) => (
                                    <Col key={index} span={10}>
                                        <Button
                                            type={
                                                selectedConfig === config ? 'primary' : 'default'
                                            }
                                            onClick={() => handleSelectConfig(config)}
                                            block
                                        >
                                            {config}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </TabPane>
                        <TabPane tab="High memory" key="2">
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
                        </TabPane>
                        <TabPane tab="HighCore CPU" key="3">
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
                        </TabPane>
                    </Tabs>
                </Form.Item>

                <Divider {...dividerProps}>Сетевые настройки</Divider>

                <Form.Item
                    label={"Публичный адрес:"}
                    name={"public_ip"}
                >
                    <Space.Compact size="middle">
                        {publicIPs.map((ip, index) => (
                            <Button
                                key={index}
                                type={publicIP === ip ? 'primary' : 'default'}
                                onClick={() => handleChangePublicIP(ip)}
                            >
                                {ip}
                            </Button>
                        ))}
                    </Space.Compact>
                </Form.Item>
                <Form.Item
                    label={"Внутренний адрес:"}
                    name={"private_ip"}
                >
                    <Space.Compact size="middle">
                        {privateIPs.map((ip, index) => (
                            <Button
                                key={index}
                                type={privateIP === ip ? 'primary' : 'default'}
                                onClick={() => handleChangePrivateIP(ip)}
                            >
                                {ip}
                            </Button>
                        ))}
                    </Space.Compact>
                </Form.Item>

                <Divider {...dividerProps}>Доступ</Divider>

                <Form.Item
                    label={"SSH-ключ"}
                    name="ssh"
                    rules={[
                        {
                            required: true,
                            message: "Обязательное поле"
                        }
                    ]}
                >
                    <TextArea
                        placeholder="Открытый ключ. Должен начинаться с 'ssh-rsa', 'ssh-ed25519'"
                        onChange={(e) => handleChangeSSHKey(e.target.value)}
                    />
                </Form.Item>

                <Divider {...dividerProps}>Общая информация</Divider>

                <Form.Item
                    label="Имя:"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Обязательное поле",
                        }
                    ]}
                >
                    <Input
                        placeholder="Введите имя"
                        onChange={(e) => handleChangeMachineName(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    labelCol={{span: 5}}
                    label={"Запустить ВМ после создания:"}
                >
                    <Checkbox
                        checked={startAfterCreate}
                        onChange={(e) => handleChangeStartAfterCreate(e.target.checked)}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{span: 2}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default CreateVirtualMachinePage;