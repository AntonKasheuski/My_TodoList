import React, {useCallback} from 'react';
import TodoList from "./TodoList";
import {AddItem} from "./AddItem";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolistAC, TodolistType} from "./redux/todolistsReducer";
import {AppRootStateType} from "./redux/store";
import {Header} from "./Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function App() {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
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
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItem addItem={addTodoList}/>
                </Grid>
                <Grid container>
                    {todolistsRender}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
