import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolistsReducer";
import {Dispatch} from "redux";
import {tasksApi, TaskType} from "../api/task-api";
import {SetErrorAC, SetLoadingStatusAC} from "./app-reducer";

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
            const newTasks = action.tasks.map(t => ({...t, entityStatus: false}))
            stateCopy[action.todolistId] = newTasks
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
        case "SET-ENTITY-STATUS": {
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
export const SetEntityStatusAC = (todolistsID: string, taskID: string, entityStatus: boolean) => {
    return {type: 'SET-ENTITY-STATUS', todolistsID, taskID, entityStatus} as const
}

export type SetTasksAT = ReturnType<typeof SetTasksAC>
export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
export type AddTaskAT = ReturnType<typeof AddTaskAC>
export type UpdateTaskAT = ReturnType<typeof UpdateTaskAC>
export type SetEntityStatusAT = ReturnType<typeof SetEntityStatusAC>

export type TasksActionType = SetTodolistsAT
    | SetTasksAT
    | RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetEntityStatusAT

export const GetTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(SetLoadingStatusAC(false))
            dispatch(SetTasksAC(res.items, todolistId))
        })
}
export const RemoveTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(SetEntityStatusAC(todolistId, taskId, true))
    dispatch(SetLoadingStatusAC(true))
    tasksApi.removeTask(todolistId, taskId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetEntityStatusAC(todolistId, taskId, false))
                dispatch(SetLoadingStatusAC(false))
                dispatch(RemoveTaskAC(todolistId, taskId))
            }
        })
}
export const AddTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    tasksApi.addTask(todolistId, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetLoadingStatusAC(false))
                dispatch(AddTaskAC(todolistId, res.data.item))
            } else {
                dispatch(SetLoadingStatusAC(false))
                dispatch(SetErrorAC(res.messages[0]))
            }
        })
}
export const ChangeTaskStatusTC = (todolistId: string, task: TaskType, isDone: boolean) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    tasksApi.changeTaskStatus(todolistId, task, isDone)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetLoadingStatusAC(false))
                dispatch(UpdateTaskAC(todolistId, res.data.item))
            }
        })
}
export const RenameTaskTC = (todolistId: string, task: TaskType, title: string) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    tasksApi.renameTask(todolistId, task, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetLoadingStatusAC(false))
                dispatch(UpdateTaskAC(todolistId, res.data.item))
            }
        })
}