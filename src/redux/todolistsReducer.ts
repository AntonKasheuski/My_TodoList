import {Dispatch} from "redux";
import {todolistApi, TodolistResponseType} from "../api/todolist-api";
import {SetErrorAC, SetLoadingStatusAC} from "./app-reducer";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = TodolistResponseType & {
    filter: FilterType
    entityStatus: boolean
}

const todolistsInitialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = todolistsInitialState, action: TodolistsActionType): TodolistType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({
                id: tl.id,
                addedDate: tl.addedDate,
                order: tl.order,
                title: tl.title,
                filter: 'all',
                entityStatus: false
            }))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist =
                {
                    id: action.todolist.id,
                    addedDate: action.todolist.addedDate,
                    order: action.todolist.order,
                    title: action.todolist.title,
                    filter: 'all',
                    entityStatus: false
                } as TodolistType
            return [newTodolist, ...state]
        }
        case "RENAME-TODOLIST": {
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.newTitle}
                : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        }
        case "SET-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.id
                ? {...tl, entityStatus: action.entityStatus}
                : tl)
        }
        default:
            return state
    }
}
export const SetTodolistsAC = (todolists: TodolistResponseType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const RemoveTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}
export const AddTodolistAC = (todolist: TodolistResponseType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const RenameTodolistAC = (id: string, newTitle: string) => {
    return {type: 'RENAME-TODOLIST', id, newTitle} as const
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
export const SetEntityStatusAC = (id: string, entityStatus: boolean) => {
    return {type: 'SET-ENTITY-STATUS', id, entityStatus} as const
}

export type SetTodolistsAT = ReturnType<typeof SetTodolistsAC>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type RenameTodolistAT = ReturnType<typeof RenameTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export type SetEntityStatusAT = ReturnType<typeof SetEntityStatusAC>

export type TodolistsActionType = SetTodolistsAT
    | RemoveTodolistAT
    | AddTodolistAT
    | RenameTodolistAT
    | ChangeTodolistFilterAT
    | SetEntityStatusAT


export const GetTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(SetLoadingStatusAC(false))
            dispatch(SetTodolistsAC(res))
        })
}
export const RemoveTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(SetEntityStatusAC(todolistId, true))
    dispatch(SetLoadingStatusAC(true))
    todolistApi.removeTodolist(todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetEntityStatusAC(todolistId, false))
                dispatch(SetLoadingStatusAC(false))
                dispatch(RemoveTodolistAC(todolistId))
            }
        })
}
export const AddTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    todolistApi.addTodolist(title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetLoadingStatusAC(false))
                dispatch(AddTodolistAC(res.data.item))
            } else {
                dispatch(SetLoadingStatusAC(false))
                dispatch(SetErrorAC(res.messages[0]))
            }
        })
}
export const RenameTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    todolistApi.renameTodolist(todolistId, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetLoadingStatusAC(false))
                dispatch(RenameTodolistAC(todolistId, title))
            }
        })
}