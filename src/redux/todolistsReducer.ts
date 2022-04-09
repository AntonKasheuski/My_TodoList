import {Dispatch} from "redux";
import {todolistApi, TodolistResponseType} from "../api/todolist-api";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string,
    titleTD: string,
    filter: FilterType
}

const todolistsInitialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = todolistsInitialState, action: TodolistsActionType): TodolistType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({id: tl.id, titleTD: tl.title, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist = {id: "newID", titleTD: action.titleTD, filter: 'all'} as TodolistType
            return [newTodolist, ...state]
        }
        case "RENAME-TODOLIST": {
            return state.map(tl => tl.id === action.id
                ? {...tl, titleTD: action.newTitleTD}
                : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
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
export const AddTodolistAC = (titleTD: string) => {
    return {type: 'ADD-TODOLIST', titleTD} as const
}
export const RenameTodolistAC = (id: string, newTitleTD: string) => {
    return {type: 'RENAME-TODOLIST', id, newTitleTD} as const
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}

export type SetTodolistsAT = ReturnType<typeof SetTodolistsAC>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type RenameTodolistAT = ReturnType<typeof RenameTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>

export type TodolistsActionType = SetTodolistsAT
    | RemoveTodolistAT
    | AddTodolistAT
    | RenameTodolistAT
    | ChangeTodolistFilterAT


export const GetTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(SetTodolistsAC(res.data))
        })
}