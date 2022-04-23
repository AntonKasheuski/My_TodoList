import {combineReducers} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

export const store = configureStore({
    reducer: rootReducer})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store.getState()