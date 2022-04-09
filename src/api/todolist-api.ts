import {instance} from "./api-instance";

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>('/todo-lists')
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistResponseType}>>(`/todo-lists/`, {title})
    },
}

export type TodolistResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors: []
    data: T
}