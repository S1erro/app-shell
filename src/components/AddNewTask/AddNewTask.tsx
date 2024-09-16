import React, {FC, useState} from 'react';
import {Button, Flex, Form, Input, Layout} from "antd";
import {addTodo} from "api/api";

interface Props {
    onAdd: () => void
}

export const AddNewTask: FC<Props> = ({onAdd}) => {

    const [inputValue, setInputValue] = useState<string>('')

    const handleAddTodo = async () => {
        try {
            await addTodo({title: inputValue, isdone: false});
            setInputValue('');
            onAdd();
        } catch (error) {
            console.log("Ошибка при добавлении задачи:", error);
        }
    }

    return (
        <Layout>
            <Form
                layout="horizontal"
                name="add_new_task_form"
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
            >
                <Flex justify="center">
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
                </Flex>
            </Form>
        </Layout>
    );
};
