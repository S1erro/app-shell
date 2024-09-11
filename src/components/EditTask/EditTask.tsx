import React, {FC, useState} from 'react';
import {Todo} from "types";
import {editTodo} from "api/api";
import {Button, Form, Input, Space, Modal} from "antd";

interface Props {
    id: number,
    tasks: Todo[],
    onUpdate: () => void
}

const EditTask: FC<Props> = ({id, tasks, onUpdate}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [currentTask, setCurrentTask] = useState<Todo | undefined>(
        tasks.find((task) => task.id === id)
    );

    const handleSaveChanges = async () => {
        try {
            await editTodo({title: currentTask?.title, isdone: false}, id);
            setModalIsOpen(false);
            onUpdate()
        } catch (error) {
            console.log("Ошибка при сохранении изменений:", error);
        }
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
                open={modalIsOpen}
                onCancel={() => setModalIsOpen(false)}
                title="Исправление"
                footer={null}
            >
                <Form
                    name="modal_form"
                    initialValues={{ modal: currentTask?.title || '' }}
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
