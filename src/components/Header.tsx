import React from 'react';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from '@mui/material/Toolbar';
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {LogoutTC} from "../redux/auth-reducer";

export const Header = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(LogoutTC())
    }

    return (
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                    <Menu />
                </IconButton>
                <Typography variant={'h6'}>
                    News
                </Typography>
                {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>Log out</Button>}
            </Toolbar>
        </AppBar>
    );
};