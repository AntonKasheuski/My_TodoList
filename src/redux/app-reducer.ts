export type AppInitialStateType = {
    isLoading: boolean
    error: string | null
}

const appInitialState: AppInitialStateType = {
    isLoading: true,
    error: null
}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionType): AppInitialStateType => {
    switch (action.type) {
        case "SET-LOADING-STATUS":
            return {...state, isLoading: action.isLoading}
        case "SET-ERROR":
            return {...state, error: action.error}
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

export type SetLoadingStatusAT = ReturnType<typeof SetLoadingStatusAC>
export type SetErrorAT = ReturnType<typeof SetErrorAC>

export type AppActionType = SetLoadingStatusAT
    | SetErrorAT