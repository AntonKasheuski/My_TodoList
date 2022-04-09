import {combineReducers, createStore, applyMiddleware} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store.getState()