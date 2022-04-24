import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TodoList from "./TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {AddTodolistTC, GetTodolistTC, TodolistType} from "../redux/todolistsReducer";
import {AddItem} from "../components/AddItem";

export const TodoListPage = () => {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetTodolistTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistTC(title))
    }, [])

    const todolistsRender = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "10px", margin: "10px"}}>
                    <TodoList
                        todoListID={tl.id}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItem addItem={addTodoList}/>
            </Grid>
            <Grid container>
                {todolistsRender}
            </Grid>
        </>
    );
};