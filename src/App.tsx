import React, {useCallback} from 'react';
import './App.css'
import TodoList from "./TodoList";
import {AddItem} from "./AddItem";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolistAC, TodolistType} from "./redux/todolistsReducer";
import {AppRootStateType} from "./redux/store";

function App() {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])

    const todolistsRender = todolists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
            />
        )
    })

    return (
        <div className="App">
            <AddItem
                addItem={addTodoList}
            />
            {todolistsRender}
        </div>
    );
}

export default App;
