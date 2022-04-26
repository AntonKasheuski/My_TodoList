import {Dispatch} from "redux";
import {SetLoadingStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {FormValuesType} from "../features/Login";
import {authAPI} from "../api/auth-api";

export type AuthInitialStateType = {
    isLoggedIn: boolean
}

const authInitialState: AuthInitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: AuthInitialStateType = authInitialState, action: AuthActionType): AuthInitialStateType => {
    switch (action.type) {
        case "SET-LOGGED-STATUS":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const SetLoggedInStatusAC = (value: boolean) => {
    return {type: "SET-LOGGED-STATUS", value} as const
}

export type SetLoggedInStatusAT = ReturnType<typeof SetLoggedInStatusAC>

export type AuthActionType = SetLoggedInStatusAT

export const LoginTC = (values: FormValuesType) => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    authAPI.login(values)
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
            dispatch(SetLoadingStatusAC(false))
        })
}
export const LogoutTC = () => (dispatch: Dispatch) => {
    dispatch(SetLoadingStatusAC(true))
    authAPI.logout()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(SetLoggedInStatusAC(false))
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