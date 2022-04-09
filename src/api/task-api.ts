import {instance} from "./api-instance";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    changeTaskStatus(todolistId: string, task: TaskType, isDone: boolean) {
        const data = {
            title: task.title,
            description: task.description,
            status: isDone ? TaskStatuses.Completed : TaskStatuses.InProgress,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${task.id}`, data)
    },
    renameTask(todolistId: string, task: TaskType, title: string) {
        const data = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${task.id}`, data)
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
type ResponseType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors: []
    data: T
}