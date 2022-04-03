import React, {ChangeEvent} from 'react';
import './App.css'
import {AddItem} from "./AddItem";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, RenameTaskAC, TaskType} from "./redux/tasksReducer";
import {
    ChangeTodolistFilterAC,
    FilterType,
    RemoveTodolistAC,
    RenameTodolistAC,
    TodolistType
} from "./redux/todolistsReducer";
import {AppRootStateType} from "./redux/store";

type TodoListPropsType = {
    todoListID: string
}

const TodoList = (props: TodoListPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(tl => tl.id === props.todoListID)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()

    if (todolist.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const todolistTasks = tasks.map(t => {
        const removeTask = (todoListID: string, taskID: string) => {
            dispatch(RemoveTaskAC(todoListID, taskID))
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(ChangeTaskStatusAC(props.todoListID, t.id, e.currentTarget.checked))
        }
        const renameTask = (title: string) => {
            dispatch(RenameTaskAC(props.todoListID, t.id, title))
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type={"checkbox"} checked={t.isDone} onChange={changeTaskStatus}/>
                <EditableSpan title={t.title} renameItem={renameTask}/>
                <button onClick={() => removeTask(props.todoListID, t.id)}>x</button>
            </li>
        )
    })

    const onClickFilterHandler = (filter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(props.todoListID, filter))
    }
    const onClickRemoveTodoListHandler = () => {
        dispatch(RemoveTodolistAC(props.todoListID))
    }
    const addTask = (title: string) => {
        dispatch(AddTaskAC(props.todoListID, title))
    }
    const renameTodoList = (title: string) => {
        dispatch(RenameTodolistAC(props.todoListID, title))
    }

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.titleTD} renameItem={renameTodoList} />
                <button onClick={onClickRemoveTodoListHandler}>X</button>
            </h3>
            <AddItem
                addItem={addTask}
            />
            <ul>
                {todolistTasks}
            </ul>
            <div>
                <button
                    className={todolist.filter === 'all' ? 'active-filter' : ''}
                    onClick={() => onClickFilterHandler('all')}
                >all
                </button>
                <button
                    className={todolist.filter === 'active' ? 'active-filter' : ''}
                    onClick={() => onClickFilterHandler('active')}>active
                </button>
                <button
                    className={todolist.filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => onClickFilterHandler('completed')}>completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;