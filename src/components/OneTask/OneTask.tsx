import React, {FC} from 'react';
import cls from "./OneTask.module.scss";
import {Todo, TasksProps} from "types";
import EditTask from "components/EditTask/EditTask";
import {deleteTodo, editTodo} from "pages/api";
import {Button, Checkbox, Input, Layout, Typography} from "antd";

interface Props {
    task: Todo;
    tasks: Todo[];
    onUpdate: () => void
}

const {Title} = Typography;

const OneTask: FC<Props> = ({task, tasks, onUpdate}) => {

    const handleCheckboxChange = async (id: number, tasks: Todo[]) => {
        const currentTask = tasks.find((task) => task.id === id);
        await editTodo({title: currentTask?.title, isdone: !currentTask?.isdone}, id)
        onUpdate()
    };

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
        onUpdate()
    }

    return (
        <Layout className={cls.taskContainer}>
            <Checkbox
                type="checkbox"
                checked={task.isdone}
                onChange={() => handleCheckboxChange(task.id, tasks)}
            />

            <Title level={5}> {task.title}</Title>

            <Layout className={cls["btn-container"]}>
                <EditTask
                    id={task.id}
                    tasks={tasks}
                />
                <Button
                    onClick={() => handleDeleteTodo(task.id)}
                >
                    Удалить
                </Button>
            </Layout>
        </Layout>
    );
};

export default OneTask;
