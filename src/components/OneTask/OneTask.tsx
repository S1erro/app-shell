import React, {FC} from 'react';
import cls from './OneTask.module.scss';
import {Todo} from "types";
import EditTask from "components/EditTask/EditTask";
import {deleteTodo, editTodo} from "api/api";
import {Button, Checkbox, Flex, Layout, Space, Typography} from "antd";

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
            <Flex justify={"space-between"}>
                <Space>
                    <Checkbox
                        type="checkbox"
                        checked={task.isdone}
                        onChange={() => handleCheckboxChange(task.id, tasks)}
                    />

                    <Title
                        level={4}
                        style={{
                            margin: 0,
                            padding: 0,
                            textDecoration: task.isdone ? 'line-through' : 'none'
                        }}
                    >
                        {task.title}
                    </Title>
                </Space>

                <Space>
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
                </Space>
            </Flex>
        </Layout>
    );
};

export default OneTask;
