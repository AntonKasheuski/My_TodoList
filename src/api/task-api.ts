import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    }
}

export type TasksResponseType= {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}