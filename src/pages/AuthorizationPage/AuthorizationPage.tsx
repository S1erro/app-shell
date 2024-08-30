import React, {FC, useState} from 'react';
import {Form, Layout, Input, Button} from "antd";
import cls from "./AuthorizationPage.module.css";
import {useNavigate} from "react-router-dom";

interface Props {
    setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthorizationPage: FC<Props> = ({setCurrentUser}) => {

    const [username, setUsername] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        localStorage.setItem("currentUser", username);
        setCurrentUser(username);
        navigate("/");
    }

    return (
        <Layout
            className={cls["layout"]}
        >
            <Form
                layout="horizontal"
                name="authorization_form"
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Имя пользователя:"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Введите имя пользователя',
                        },
                    ]}
                >
                    <Input onChange={(e) => setUsername(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Пароль:"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{offset: 8, span: 8}}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={cls["button"]}
                    >
                        Ок
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default AuthorizationPage;