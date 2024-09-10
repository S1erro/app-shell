import React, {FC, useState} from 'react';
import cls from "./EditTask.module.scss";
import {Todo, TasksProps} from "types";
import Modal from "react-modal";
import {editTodo} from "pages/api";
import {Button, Input, Layout, Typography} from "antd";

interface Props  {
    id: number,
    tasks: Todo[]
}

const {Title} = Typography;

const EditTask: FC<Props> = ({id, tasks}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [currentTask, setCurrentTask] = useState<Todo | undefined>(
        tasks.find((task) => task.id === id)
    );

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
            >
                <Title level={2}>Edit Task</Title>
                <Input
                    value={currentTask?.title || ''}
                    className={cls.input}
                    onChange={(event) =>
                        setCurrentTask({...currentTask!, title: event.target.value})
                    }
                />
                <Layout>
                    <Button
                        onClick={() => {
                            editTodo({title: currentTask?.title, isdone: false}, id);
                            setModalIsOpen(false);
                        }}
                    >
                        Сохранить
                    </Button>
                    <Button
                        onClick={() => setModalIsOpen(false)}
                    >
                        Отмена
                    </Button>
                </Layout>
            </Modal>
        </>
    );
};

export default EditTask;
