import React from 'react';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from '@mui/material/Toolbar';
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Header = () => {
    return (
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                    <Menu />
                </IconButton>
                <Typography variant={'h6'}>
                    News
                </Typography>
                <Button color={'inherit'}>Login</Button>
            </Toolbar>
        </AppBar>
    );
};