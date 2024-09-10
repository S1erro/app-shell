import React from 'react';
import cls from "./AllTasks.module.scss";
import {ViewTasks} from "components/ViewAllTasks/ViewAllTasks";
import {Layout} from "antd";

const AllTasksPage = () => {
    return (
        <Layout className={cls.main}>
            <ViewTasks />
        </Layout>
    );
};

export default AllTasksPage;