import React, {ButtonHTMLAttributes, FC, useState} from 'react';
import Modal from "react-modal";
import {addTodo} from "pages/api";
import {Button, Typography} from "antd";

interface addProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    input: string,
    resetInput: () => void
}

const { Title } = Typography;

const AddTaskButton: FC<addProps> = ({input, resetInput}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => {
                    if(!addTodo({title: input, isdone: false})) {
                        setModalIsOpen(true);
                    }
                    resetInput();
                }}
            >
                Add
            </Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Error"
            >
                <Title>h2. Enter the task name</Title>

                <Button
                    onClick={() => setModalIsOpen(false)}
                >
                    Close
                </Button>

            </Modal>
        </>
    );
};

export default AddTaskButton;