import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {Header} from "./components/Header";
import Container from "@mui/material/Container";
import LinearProgress from '@mui/material/LinearProgress';
import s from './App.module.css'
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";
import {TodoListPage} from "./features/TodoListPage";
import {initializeAppTC} from "./redux/app-reducer";
import {CircularProgress} from "@mui/material";

function App() {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <Header/>
            {isLoading ? <LinearProgress color="secondary"/> : <div className={s.div}></div>}
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodoListPage/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
