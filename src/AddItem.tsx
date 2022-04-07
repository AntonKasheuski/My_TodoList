import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css'

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

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={itemTextInsert}
                   onChange={itemTextInsertHandler}
                   onKeyPress={addItemOnEnter}
            />
            <button onClick={addItem}>+</button>
        </div>
    );
});