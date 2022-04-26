import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {SetLoggedInStatusAC} from "./auth-reducer";

export type AppInitialStateType = {
    isLoading: boolean
    error: string | null
    isInitialized: boolean
}

const appInitialState: AppInitialStateType = {
    isLoading: false,
    error: null,
    isInitialized: false,
}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionType): AppInitialStateType => {
    switch (action.type) {
        case "SET-LOADING-STATUS":
            return {...state, isLoading: action.isLoading}
        case "SET-ERROR":
            return {...state, error: action.error}
        case "SET-INITIALIZED-STATUS":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const SetLoadingStatusAC = (isLoading: boolean) => {
    return {type: "SET-LOADING-STATUS", isLoading} as const
}
export const SetErrorAC = (error: string | null) => {
    return {type: "SET-ERROR", error} as const
}
export const SetInitializedStatusAC = (isInitialized: boolean) => {
    return {type: "SET-INITIALIZED-STATUS", isInitialized} as const
}

export type SetLoadingStatusAT = ReturnType<typeof SetLoadingStatusAC>
export type SetErrorAT = ReturnType<typeof SetErrorAC>
export type SetInitializedStatusAT = ReturnType<typeof SetInitializedStatusAC>

export type AppActionType = SetLoadingStatusAT
    | SetErrorAT
    | SetInitializedStatusAT

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetLoggedInStatusAC(true))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(SetInitializedStatusAC(true))
        })
}