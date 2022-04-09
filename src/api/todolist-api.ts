import {instance} from "./api-instance";

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>('/todo-lists')
            .then(res => res.data)
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
            .then(res => res.data)
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistResponseType}>>(`/todo-lists/`, {title})
            .then(res => res.data)
    },
    renameTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title})
            .then(res => res.data)
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