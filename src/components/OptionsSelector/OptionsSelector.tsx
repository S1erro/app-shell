import React, {FC} from 'react';
import {Filter} from "types";
import {Button, Layout} from "antd";

interface OptionsProps {
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
    todoCountByStatus: { all: number, completed: number, inwork: number }
}

const OptionsSelector: FC<OptionsProps> = ({setFilter, todoCountByStatus}) => {

    const completedTasksCount = todoCountByStatus.completed ? todoCountByStatus.completed : 0;

    const inWorkTasksCount = todoCountByStatus.inwork ? todoCountByStatus.inwork : 0;

    const allTasksCount = todoCountByStatus.all ? todoCountByStatus.all : 0;

    return (
        <Layout>
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

        </Layout>
    );
};

export default OptionsSelector;