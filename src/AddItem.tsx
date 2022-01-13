import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css'

type PropsType = {
    addItem: (title: string) => void
}

export const AddItem = (props: PropsType) => {

    const [taskTextInsert, setTaskTextInsert] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const taskTextInsertHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
            setTaskTextInsert('')
        } else {
            setTaskTextInsert(e.currentTarget.value)
        }
    }
    const addTask = () => {
        const trimmedTask = taskTextInsert.trim()
        if (trimmedTask) {
            props.addItem(taskTextInsert)
            setTaskTextInsert('')
        } else {
            setError(true)
            setTaskTextInsert('Add text!')
        }
    }
    const addTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={taskTextInsert}
                   onChange={taskTextInsertHandler}
                   onKeyPress={addTaskOnEnter}
            />
            <button onClick={addTask}>+</button>
        </div>
    );
};