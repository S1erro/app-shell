import React from 'react';
import cls from "./AllTasks.module.scss";
import {AddNewTask} from "components/AddNewTask/AddNewTask";
import {ViewTasks} from "components/ViewAllTasks/ViewAllTasks";
import {Layout} from "antd";

const AllTasksPage = () => {

    return (
        <Layout className={cls.main}>
            <AddNewTask />
            <ViewTasks />
        </Layout>
    );
};

export default AllTasksPage;