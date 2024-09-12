import React, {useState} from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Layout,
    Radio,
    Row,
    Select,
    Slider,
    Switch,
    Tabs
} from "antd";
import {
    HighCoreConfig,
    HighMemoryConfig,
    OperatingSystems,
    PublicIPs,
    ServerOptions,
    StandardConfig,
    StorageCapacityRange
} from "types";

const standardConfigurations = Object.values(StandardConfig);
const highMemoryConfigurations = Object.values(HighMemoryConfig);
const highCoreConfigurations = Object.values(HighCoreConfig);
const operatingSystems = Object.values(OperatingSystems);
const publicIPs = Object.values(PublicIPs);

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
        };
    });

const itemRules = [
    {
        required: true,
        message: "Обязательное поле"
    }
];

const {TextArea} = Input;

const CreateVirtualMachinePage = () => {
    const [selectedConfig, setSelectedConfig] = useState<string | null>(
        standardConfigurations[0] ||
        highMemoryConfigurations[0] ||
        highCoreConfigurations[0] ||
        null
    );

    const [isManualIP, setIsManualIP] = useState(false);

    const handleSelectConfig = (config: string) => {
        setSelectedConfig(config);
    };

    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log("Form Values: ", values);
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
        <Layout style={{padding: "2rem"}}>
            <Form
                form={form}
                wrapperCol={{span: 20}}
                labelCol={{span: 4}}
                labelAlign={"left"}
                layout="horizontal"
                onFinish={handleSubmit}
            >
                <Form.Item label="ОС:" name="operating_system" rules={itemRules}>
                    <Radio.Group>
                        {operatingSystems.map((os, index) => (
                            <Radio.Button key={index} value={os}>
                                {os}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Divider {...dividerProps}>Расположение</Divider>

                <Form.Item label="Зона доступности" name="server" rules={itemRules}>
                    <Select placeholder="Выберите зону доступности" options={options}/>
                </Form.Item>

                <Divider {...dividerProps}>Диски и файловые хранилища</Divider>

                <Form.List name="drives" initialValue={[]}>
                    {(fields, {add, remove}) => (
                        <>
                            <Form.Item>
                                <Button onClick={() => add()} disabled={fields.length >= 3}>
                                    Добавить диск
                                </Button>
                            </Form.Item>

                            {fields.map(({key, name}) => (
                                <Form.Item key={key} label={`Размер диска ${key % 3 + 1} (Гб):`}>
                                    <Form.Item name={[name, "capacity"]} noStyle>
                                        <Slider
                                            min={StorageCapacityRange.min}
                                            max={StorageCapacityRange.max}
                                            style={{width: '80%'}}
                                            tooltip={{open: true}}
                                        />
                                    </Form.Item>
                                    <Button onClick={() => remove(name)} style={{marginLeft: 8}}>
                                        Удалить
                                    </Button>
                                </Form.Item>
                            ))}
                        </>
                    )}
                </Form.List>

                <Divider {...dividerProps}>Вычислительные ресурсы</Divider>

                <Form.Item label="Конфигурация:">
                    <Tabs items={tabItems}/>
                </Form.Item>

                <Divider {...dividerProps}>Сетевые настройки</Divider>

                <Form.Item label="Публичный адрес:" name="public_ip" rules={itemRules}>
                    <Radio.Group>
                        {publicIPs.map((ip, index) => (
                            <Radio.Button key={index} value={ip}>
                                {ip}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Внутренний адрес:" rules={itemRules}>
                    <Radio.Group
                        onChange={(e) => setIsManualIP(e.target.value === 'manual')}
                        defaultValue="auto"
                    >
                        <Radio.Button value="auto">Автоматически</Radio.Button>
                        <Radio.Button value="manual">Вручную</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {isManualIP && (
                    <Form.Item
                        name="private_ip"
                        label="Введите IP:"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите IP-адрес!'
                            },
                            {
                                pattern: new RegExp(
                                    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                                ),
                                message: 'Введите корректный IP-адрес!'
                            }
                        ]}
                    >
                        <Input placeholder="Введите IP" />
                    </Form.Item>
                )}

                <Divider {...dividerProps}>Доступ</Divider>

                <Form.Item label="SSH-ключ" name="ssh" rules={itemRules}>
                    <TextArea placeholder="Открытый ключ. Должен начинаться с 'ssh-rsa', 'ssh-ed25519'"/>
                </Form.Item>

                <Divider {...dividerProps}>Общая информация</Divider>

                <Form.Item label="Имя:" name="name" rules={itemRules}>
                    <Input placeholder="Введите имя"/>
                </Form.Item>

                <Form.Item labelCol={{span: 5}} label="Запустить ВМ после создания:" name="startAfterCreate">
                    <Switch/>
                </Form.Item>

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
