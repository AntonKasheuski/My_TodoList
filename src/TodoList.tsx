import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TodoListType} from "./App";

type TodoListPropsType = {
    todoListTitle: string,
    todoList: TodoListType,
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const todoListTasks = props.todoList.map(t => {
        const removeTask = (taskID: string) => {
            props.removeTask(taskID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id}>
                <input type={"checkbox"} checked={t.isDone} onChange={changeTaskStatus}/>
                <span>{t.title}</span>
                <button onClick={() => removeTask(t.id)}>x</button>
            </li>
        )
    })

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
            props.addTask(taskTextInsert)
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
    const onClickFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.todoListTitle}</h3>
            <input className={error ? "error" : ""}
                value={taskTextInsert}
                onChange={taskTextInsertHandler}
                onKeyPress={addTaskOnEnter}
            />
            <button onClick={addTask}>+</button>
            <ul>
                {todoListTasks}
            </ul>
            <div>
                <button onClick={()=>onClickFilterHandler('all')}>all</button>
                <button onClick={()=>onClickFilterHandler('active')}>active</button>
                <button onClick={()=>onClickFilterHandler('completed')}>completed</button>
            </div>
        </div>
    );
};

export default TodoList;