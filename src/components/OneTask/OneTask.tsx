import React, {FC} from 'react';
import cls from './OneTask.module.scss';
import {Todo, TasksProps} from "types";
import EditTask from "components/EditTask/EditTask";
import {deleteTodo, editTodo} from "api/api";
import {Button, Checkbox, Layout, Typography} from "antd";

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
        <Layout className={cls["task-container"]}>
            <Checkbox
                type="checkbox"
                checked={task.isdone}
                onChange={() => handleCheckboxChange(task.id, tasks)}
            />

            <Title level={5}> {task.title}</Title>

            <Layout>
                <EditTask
                    id={task.id}
                    tasks={tasks}
                    onUpdate={onUpdate}
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
