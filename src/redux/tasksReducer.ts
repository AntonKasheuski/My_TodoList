import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, todolistsID1, todolistsID2} from "./todolistsReducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksListType = {
    [key: string]: Array<TaskType>
}

const tasksInitialState: TasksListType = {
    [todolistsID1]: [{id: v1(), title: "task1", isDone: true},
        {id: v1(), title: "task2", isDone: false},
        {id: v1(), title: "task3", isDone: false}],
    [todolistsID2]: [{id: v1(), title: "task5", isDone: true},
        {id: v1(), title: "task6", isDone: false},
        {id: v1(), title: "task7", isDone: false},
        {id: v1(), title: "task8", isDone: true}],
}

export const tasksReducer = (state: TasksListType = tasksInitialState, action: TasksActionType): TasksListType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistsID] = [newTask, ...state[action.todolistsID]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].map(t => t.id === action.taskID
                ? {...t, isDone: action.newStatus}
                : t)
            return stateCopy
        }
        case "RENAME-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].map(t => t.id === action.taskID
                ? {...t, title: action.newTitle}
                : t)
            return stateCopy
        }
        case "ADD-TODOLIST": {
            return {...state, ["newID"]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (todolistsID: string, taskID: string) => {
    return {type: "REMOVE-TASK", todolistsID, taskID} as const
}
export const AddTaskAC = (todolistsID: string, title: string) => {
    return {type: "ADD-TASK", todolistsID, title} as const
}
export const ChangeTaskStatusAC = (todolistsID: string, taskID: string, newStatus: boolean) => {
    return {type: "CHANGE-TASK-STATUS", todolistsID, taskID, newStatus} as const
}
export const RenameTaskAC = (todolistsID: string, taskID: string, newTitle: string) => {
    return {type: "RENAME-TASK", todolistsID, taskID, newTitle} as const
}

export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
export type AddTaskAT = ReturnType<typeof AddTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
export type RenameTaskAT = ReturnType<typeof RenameTaskAC>

export type TasksActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | RenameTaskAT
    | AddTodolistAT
    | RemoveTodolistAT