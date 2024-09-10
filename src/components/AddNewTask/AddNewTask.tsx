import React, {useState} from 'react';
import cls from './AddNewTask.module.scss';
import AddTaskButton from "components/AddTaskButton/AddTaskButton";
import {Input, Layout} from "antd";

export const AddNewTask = () => {

    const [input, setInput] = useState<string>('')

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    return (
        <Layout className={cls.header}>
                <Input
                    type="text"
                    placeholder="OneTask To Be Done..."
                    className={cls.input}
                    onChange={inputChange}
                    value={input}
                />
                <AddTaskButton
                    input={input}
                    resetInput={() => setInput('')}
                />
        </Layout>
    );
};
