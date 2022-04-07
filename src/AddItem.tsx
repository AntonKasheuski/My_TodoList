import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css'
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {TextField} from "@mui/material";

type PropsType = {
    title?: string
    addItem: (title: string) => void
}

export const AddItem = React.memo((props: PropsType) => {
    const [itemTextInsert, setItemTextInsert] = useState<string>(props.title ? props.title : '')
    const [error, setError] = useState<boolean>(false)

    const itemTextInsertHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
            setItemTextInsert('')
        } else {
            setItemTextInsert(e.currentTarget.value)
        }
    }
    const addItem = () => {
        const trimmedItem = itemTextInsert.trim()
        if (trimmedItem) {
            props.addItem(itemTextInsert)
            setItemTextInsert('')
        } else {
            setError(true)
            setItemTextInsert('Add text!')
        }
    }
    const addItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const onFocusHandler = () => {
        if (error) {
            setError(false)
            setItemTextInsert('')
        }
    }

    return (
        <div>
            <TextField value={itemTextInsert}
                       label={'Title'}
                       error={error}
                       onFocus={onFocusHandler}
                       helperText={error ? 'Incorrect entry.' : ''}
                       onChange={itemTextInsertHandler}
                       onKeyPress={addItemOnEnter}
            />
            <IconButton color={'primary'}
                        onClick={addItem}
                        disabled={error}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
});