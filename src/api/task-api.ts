import {instance} from "./api-instance";
import {ResponseType} from "./todolist-api";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    updateTask(todolistId: string, task: TaskType, isDone: number, title: string) {
        const data = {
            title: title,
            description: task.description,
            status: isDone,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${task.id}`, data)
            .then(res => res.data)
    }
}

export type GetTasksResponseType = {
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