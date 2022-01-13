import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from "./App";
import './App.css'
import {AddItem} from "./AddItem";

type TodoListPropsType = {
    todoListTitle: string,
    todoListID: string,
    todoListTasks: Array<TaskType>,
    filter: FilterType,
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeFilter: (filter: FilterType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const todoListTasks = props.todoListTasks.map(t => {
        const removeTask = (taskID: string, todoListID: string) => {
            props.removeTask(taskID, todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type={"checkbox"} checked={t.isDone} onChange={changeTaskStatus}/>
                <span>{t.title}</span>
                <button onClick={() => removeTask(t.id, props.todoListID)}>x</button>
            </li>
        )
    })

    const onClickFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter, props.todoListID)
    }
    const onClickRemoveTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    return (
        <div>
            <h3>
                {props.todoListTitle}
                <button onClick={onClickRemoveTodoListHandler}>X</button>
            </h3>
            <AddItem
                addItem={addTask}
            />
            <ul>
                {todoListTasks}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={() => onClickFilterHandler('all')}
                >all
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={() => onClickFilterHandler('active')}>active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => onClickFilterHandler('completed')}>completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;