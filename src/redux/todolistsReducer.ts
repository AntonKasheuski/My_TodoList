import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string,
    titleTD: string,
    filter: FilterType
}

export const todolistsID1 = v1();
export const todolistsID2 = v1();

const todolistsInitialState: TodolistType[] = [
    {id: todolistsID1, titleTD: "First TodoList", filter: 'all'},
    {id: todolistsID2, titleTD: "Second TodoList", filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = todolistsInitialState, action: TodolistsActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        default:
            return state
    }
}

export const AddTodolistAC = (titleTD: string) => {
    return {type: 'ADD-TODOLIST', titleTD} as const
}
export const RemoveTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}

export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>

export type TodolistsActionType = AddTodolistAT
    | RemoveTodolistAT
