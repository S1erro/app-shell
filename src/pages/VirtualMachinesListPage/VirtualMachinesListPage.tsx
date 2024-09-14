import React, {useEffect} from 'react';
import {Button, Card, Layout, List, message, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {AppDispatch} from "store/store";
import {useDispatch, useSelector} from "react-redux";
import {selectVirtualMachines} from "store/VirtualMachines/virtualMachinesSelectors";
import {fetchedVirtualMachines} from "store/VirtualMachines/virtualMachinesSlice";
import {useVirtualMachinesActions} from "../../store/VirtualMachines/virtualMachineActions";
import {PoweroffOutlined} from "@ant-design/icons";
import {VirtualMachine} from "../../types";

const {Title} = Typography;

const VirtualMachinesListPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const {virtualMachines, status} = useSelector(selectVirtualMachines);
    const {handleRemoveVirtualMachine, handleEditVirtualMachine} = useVirtualMachinesActions();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (status.isLoading) {
            dispatch(fetchedVirtualMachines());
        }
        if (status.hasError) {
            messageApi.open({
                type: 'error',
                content: 'Ошибка загрузки виртуальных машин',
            });
        }
    }, [status, dispatch]);

    const handleCreateVirtualMachine = () => {
        navigate("/create-machine/:id");
    }

    const handleEditVM = (id: number) => {
        navigate(`/create-machine/${id}`);
    }

    const handleOffVirtualMachine = (machine: VirtualMachine) => {
        const updatedMachine = {...machine, isActive: !machine.isActive};
        handleEditVirtualMachine(machine.id, updatedMachine);
    }

    return (
        <Layout style={{padding: "1rem"}}>
            <Button onClick={handleCreateVirtualMachine}>
                Создать ВМ
            </Button>

            <List
                grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
                dataSource={virtualMachines}
                style={{marginTop: "1rem"}}
                renderItem={(machine) => (
                    <List.Item

                    >
                        <Card
                            title={machine.machineName}
                            actions={[
                                <a
                                    key="list-machine-edit"
                                    onClick={() => handleEditVM(machine.id)}
                                >
                                    Редактировать
                                </a>,
                                <a
                                    key="list-machine-delete"
                                    onClick={() => handleRemoveVirtualMachine(machine.id)}
                                >
                                    Удалить
                                </a>,
                                <PoweroffOutlined
                                    style={{color: machine.isActive ? "green" : "red" }}
                                    onClick={() => handleOffVirtualMachine(machine)}
                                />
                            ]}
                        >
                            <Title level={4} style={{margin: 0, padding: 0}}>
                                {machine.operatingSystem}
                            </Title>
                            <Title level={5} style={{margin: 0, padding: 0}}>
                                Конфигурация: {machine.machineConfiguration}
                            </Title>
                            <Title
                                level={5}
                                style={{margin: 0, padding: 0}}
                            >
                                Сервер: {machine.serverLocation}
                            </Title>
                            {machine.drivesCapacity
                                .map((drive, index) => (
                                    <span key={index}><b>Диск {index + 1}:</b> {drive.capacity} Гб&nbsp;</span>))}
                        </Card>
                    </List.Item>
                )}
            />
        </Layout>
    );
};

export default VirtualMachinesListPage;