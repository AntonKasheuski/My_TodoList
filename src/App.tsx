import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {Header} from "./components/Header";
import Container from "@mui/material/Container";
import LinearProgress from '@mui/material/LinearProgress';
import s from './App.module.css'
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";
import {TodoListPage} from "./features/TodoListPage";

function App() {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    return (
        <div>
            <Header/>
            {isLoading ? <LinearProgress color="secondary"/> : <div className={s.div}></div>}
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodoListPage/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
