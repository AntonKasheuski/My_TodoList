import {SetErrorAC} from "../redux/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api"


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length !== 0) {
        dispatch(SetErrorAC(data.messages[0]))
    } else {
        dispatch(SetErrorAC('Some error occurred!'))
    }
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(SetErrorAC(error.message))
}
