import React, {FC, useState} from 'react';
import {Button, Form, Input, Layout} from "antd";
import {addTodo} from "api/api";

interface Props {
    onAdd: () => void
}

export const AddNewTask: FC<Props> = ({onAdd}) => {

    const [inputValue, setInputValue] = useState<string>('')

    const handleAddTodo = async () => {
        await addTodo({title: inputValue, isdone: false});
        setInputValue('');
        onAdd();
    }

    return (
        <Layout style={{ padding: "1rem" }}>
            <Form
                layout="horizontal"
                name="add_new_task_form"
                labelCol={{span: 2}}
                wrapperCol={{span: 12}}
            >
                <Form.Item
                    label={"Задача:"}
                    name="newtask"
                    rules={[
                        {
                            required: true,
                            message: "Введите задачу"
                        }
                    ]}
                >
                    <Input
                        placeholder="Введите задачу..."
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{offset: 2}}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleAddTodo}
                    >
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};
