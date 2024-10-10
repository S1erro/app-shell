import {ApiResponse, Todo, TodoRequest} from "types";
import axios from "axios";

const domainUrl = 'https://easydev.club/api/v1'

export const fetchTodos = async (status?: 'all' | 'completed' | 'inwork'): Promise<ApiResponse> => {
    const response = await axios.get(`${domainUrl}/todos?filter=${status || 'all'}`);
    return await response.data;
}

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
    const response = await axios.post(`${domainUrl}/todos`, todo)
    return await response.data
};

export const deleteTodo = async (id: number): Promise<Todo> => {
    const response = await axios.delete(`${domainUrl}/todos/${id}`)
    return await response.data;
};

export const editTodo = async (todo: TodoRequest, id: number): Promise<Todo> => {
    const response = await axios.put(`${domainUrl}/todos/${id}`, todo);
    return await response.data;
}