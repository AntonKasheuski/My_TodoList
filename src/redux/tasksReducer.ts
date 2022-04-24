import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolistsReducer";
import {Dispatch} from "redux";
import {tasksApi, TaskType} from "../api/task-api";
import {SetErrorAC, SetLoadingStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type DomainTaskType = TaskType & {
    entityStatus: boolean
}

export type TasksListType = {
    [key: string]: Array<DomainTaskType>
}

const tasksInitialState: TasksListType = {}

export const tasksReducer = (state: TasksListType = tasksInitialState, action: TasksActionType): TasksListType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks.map(t => ({...t, entityStatus: false}))
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {...action.task, entityStatus: false}
            stateCopy[action.todolistsID] = [newTask, ...state[action.todolistsID]]
            return stateCopy
        }
        case "UPDATE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].map(t => t.id === action.task.id
                ? {...action.task, entityStatus: false}
                : t)
            return stateCopy
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TASK-STATUS": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].map(t => t.id === action.taskID
                ? {...t, entityStatus: action.entityStatus}
                : t)
            return stateCopy
        }
        default:
            return state
    }
}

export const SetTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: "SET-TASKS", tasks, todolistId} as const
}
export const RemoveTaskAC = (todolistsID: string, taskID: string) => {
    return {type: "REMOVE-TASK", todolistsID, taskID} as const
}
export const AddTaskAC = (todolistsID: string, task: TaskType) => {
    return {type: "ADD-TASK", todolistsID, task} as const
}
export const UpdateTaskAC = (todolistsID: string, task: TaskType) => {
    return {type: "UPDATE-TASK", todolistsID, task} as const
}
export const SetTaskStatusAC = (todolistsID: string, taskID: string, entityStatus: boolean) => {
    return {type: 'SET-TASK-STATUS', todolistsID, taskID, entityStatus} as const
}

export type SetTasksAT = ReturnType<typeof SetTasksAC>
export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
export type AddTaskAT = ReturnType<typeof AddTaskAC>
export type UpdateTaskAT = ReturnType<typeof UpdateTaskAC>
export type SetTaskStatusAT = ReturnType<typeof SetTaskStatusAC>

export type TasksActionType = SetTodolistsAT
    | SetTasksAT
    | RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTaskStatusAT

export const GetTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    tasksApi.getTasks(todolistId)
        .then(res => {
            if (res.error) {
                dispatch(SetErrorAC(res.error))
            } else {
                dispatch(SetTasksAC(res.items, todolistId))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(SetLoadingStatusAC(false))
        })
}
export const RemoveTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(SetTaskStatusAC(todolistId, taskId, true))
    dispatch(SetLoadingStatusAC(true))
    tasksApi.removeTask(todolistId, taskId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(RemoveTaskAC(todolistId, taskId))
            } else {
                handleServerAppError(res, dispatch)
            }
            dispatch(SetTaskStatusAC(todolistId, taskId, false))
            dispatch(SetLoadingStatusAC(false))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(SetTaskStatusAC(todolistId, taskId, false))
            dispatch(SetLoadingStatusAC(false))
        })
}
export const AddTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    tasksApi.addTask(todolistId, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(AddTaskAC(todolistId, res.data.item))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(SetLoadingStatusAC(false))
        })
}
export const UpdateTaskTC = (todolistId: string, task: TaskType, isDone: number, title: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    tasksApi.updateTask(todolistId, task, isDone, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(UpdateTaskAC(todolistId, res.data.item))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(SetLoadingStatusAC(false))
        })
}