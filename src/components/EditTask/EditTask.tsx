import React, {FC, useState} from 'react';
import cls from "./EditTask.module.scss";
import {Todo} from "types";
import Modal from "react-modal";
import {editTodo} from "api/api";
import {Button, Form, Input, Layout, Space, Typography} from "antd";

interface Props {
    id: number,
    tasks: Todo[],
    onUpdate: () => void
}

const {Title} = Typography;

const EditTask: FC<Props> = ({id, tasks, onUpdate}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [currentTask, setCurrentTask] = useState<Todo | undefined>(
        tasks.find((task) => task.id === id)
    );

    const handleSaveChanges = async () => {
        await editTodo({title: currentTask?.title, isdone: false}, id);
        setModalIsOpen(false);
        onUpdate()
    }

    return (
        <>
            <Button
                onClick={() => {
                    setModalIsOpen(true);
                    setCurrentTask(tasks.find((task) => task.id === id))
                }}
            >
                Изменить
            </Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Edit Task Modal"
                className={cls.modal}
            >
                <Title level={2}>Исправление</Title>
                <Form
                    name="modal_form"
                >
                    <Form.Item
                        name="modal"
                        rules={[
                            {
                                required: true,
                                message: "Название не может быть пустым"
                            }
                        ]}
                    >
                        <Input
                            defaultValue={currentTask?.title || ''}
                            className={cls.input}
                            onChange={(event) =>
                                setCurrentTask({...currentTask!, title: event.target.value})
                            }
                        />
                    </Form.Item>
                    <Space>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleSaveChanges()}
                            >
                                Сохранить
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                onClick={() => setModalIsOpen(false)}
                            >
                                Отмена
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};

export default EditTask;
