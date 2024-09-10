import React, {FC} from 'react';
import {Filter} from "types";
import {Button, Space} from "antd";

interface OptionsProps {
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
    todoCountByStatus: { all: number, completed: number, inwork: number }
}

const filterOptions = [
    {
        value: Filter.all,
        label: "Все"
    },
    {
        value: Filter.completed,
        label: "Закрытые"
    },
    {
        value: Filter.inwork,
        label: "В работе"
    },
]

const OptionsSelector: FC<OptionsProps> = ({setFilter, todoCountByStatus}) => {

    const completedTasksCount = todoCountByStatus.completed ? todoCountByStatus.completed : 0;

    const inWorkTasksCount = todoCountByStatus.inwork ? todoCountByStatus.inwork : 0;

    const allTasksCount = todoCountByStatus.all ? todoCountByStatus.all : 0;

    return (
        <Space style={{margin: "0 auto"}}>
            <Button
                onClick={() => setFilter(Filter.all)}
            >
                Все ({allTasksCount})
            </Button>

            <Button
                onClick={() => setFilter(Filter.inwork)}
            >
                В работе ({inWorkTasksCount})
            </Button>

            <Button
                onClick={() => setFilter(Filter.completed)}
            >
                Сделано ({completedTasksCount})
            </Button>
        </Space>
    );
};

export default OptionsSelector;