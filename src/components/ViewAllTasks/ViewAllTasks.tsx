import React, {useEffect, useState} from 'react';
import {Filter, Todo} from "types";
import OneTask from "components/OneTask/OneTask";
import OptionsSelector from "components/OptionsSelector/OptionsSelector";
import {fetchTodos} from "api/api";
import {Layout} from "antd";
import {AddNewTask} from "../AddNewTask/AddNewTask";

interface TodoCount {
    all: number;
    completed: number;
    inwork: number;
}

export const ViewTasks = () => {

    const [tasks, setTasks] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>(Filter.all)

    const [todoCountByStatus, setTodoCountByStatus] = useState<TodoCount>({
        "all": 0,
        "completed": 0,
        "inwork": 0
    })

    const loadTodos = async () => {
        try {
            const result = await fetchTodos(filter);
            setTasks(result.metaresponse.data);
            setTodoCountByStatus(result.metaresponse.info ? result.metaresponse.info : todoCountByStatus)
        } catch (error) {
            console.log("Ошибка при получении данных:", error)
        }
    };

    useEffect(() => {
        loadTodos();
    }, [filter]);

    return (
        <Layout>
            <AddNewTask onAdd={loadTodos}/>
            <OptionsSelector setFilter={setFilter} todoCountByStatus={todoCountByStatus}/>
            {tasks?.map((task) => (
                <OneTask
                    key={task.id}
                    tasks={tasks}
                    task={task}
                    onUpdate={loadTodos}
                />
            ))}
        </Layout>
    );
};