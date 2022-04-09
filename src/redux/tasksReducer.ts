import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolistsReducer";
import {Dispatch} from "redux";
import {tasksApi, TaskStatuses, TaskType} from "../api/task-api";
import {v1} from "uuid";


export type TasksListType = {
    [key: string]: Array<TaskType>
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
           stateCopy[action.todolistId] = action.tasks
           /*const newTasks = []
           for (let i = 0; i < action.tasks.length; i++) {
               newTasks.push({id: action.tasks[i].id, title: action.tasks[i].title, isDone: true})
           }
           stateCopy[action.tasks[0].todoListId] = newTasks*/
           return stateCopy
       }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {
                id: v1(),
                title: action.title,
                description: "null",
                todoListId: action.todolistsID,
                order: 0,
                status: 1,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            }
            stateCopy[action.todolistsID] = [newTask, ...state[action.todolistsID]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            stateCopy[action.todolistsID] = state[action.todolistsID].map(t => t.id === action.taskID
                ? {...t, status: action.newStatus ? TaskStatuses.Completed : TaskStatuses.InProgress}
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

export const SetTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: "SET-TASKS", tasks, todolistId} as const
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

export type SetTasksAT = ReturnType<typeof SetTasksAC>
export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
export type AddTaskAT = ReturnType<typeof AddTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
export type RenameTaskAT = ReturnType<typeof RenameTaskAC>

export type TasksActionType = SetTodolistsAT
    | SetTasksAT
    | RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | RenameTaskAT
    | AddTodolistAT
    | RemoveTodolistAT

export const GetTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(SetTasksAC(res.data.items, todolistId))
        })
}