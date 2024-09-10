import {ApiResponse, Todo, TodoInfo, TodoRequest} from "types";

const domainUrl = 'http://51.250.113.72:8082/api/v1'

export const fetchTodos = async (status?: 'all' | 'completed' | 'inwork'): Promise<ApiResponse<Todo, TodoInfo>> => {
    const response = await fetch(`${domainUrl}/todos?filter=${status || 'all'}`);
    return await response.json();
};

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
    const response = await fetch(`${domainUrl}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    return await response.json();
};

export const deleteTodo = async (id: number): Promise<Todo> => {
    const response = await fetch(`${domainUrl}/todos/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
};

export const editTodo = async (todo: TodoRequest, id: number): Promise<Todo> => {
    const response = await fetch(`${domainUrl}/todos/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    console.log(todo)
    return await response.json();
}