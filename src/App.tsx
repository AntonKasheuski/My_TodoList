import React, {useCallback, useEffect} from 'react';
import TodoList from "./TodoList";
import {AddItem} from "./components/AddItem";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolistTC, GetTodolistTC, TodolistType} from "./redux/todolistsReducer";
import {AppRootStateType} from "./redux/store";
import {Header} from "./Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LinearProgress from '@mui/material/LinearProgress';
import s from './App.module.css'
import {ErrorSnackbar} from "./components/ErrorSnackbar";

function App() {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
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
        <div>
            <Header/>
            {isLoading ? <LinearProgress color="secondary"/> : <div className={s.div}></div>}
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItem addItem={addTodoList}/>
                </Grid>
                <Grid container>
                    {todolistsRender}
                </Grid>
            </Container>
            {error && <ErrorSnackbar/>}
        </div>
    );
}

export default App;
