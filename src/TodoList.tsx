import React, {useCallback, useEffect} from 'react';
import './App.module.css'
import {AddItem} from "./components/AddItem";
import {EditableSpan} from "./components/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AddTaskTC, GetTasksTC} from "./redux/tasksReducer";
import {
    ChangeTodolistFilterAC,
    FilterType,
    RemoveTodolistTC,
    RenameTodolistTC,
    TodolistType
} from "./redux/todolistsReducer";
import {AppRootStateType} from "./redux/store";
import {Task} from "./Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import {TaskStatuses, TaskType} from "./api/task-api";

type TodoListPropsType = {
    todoListID: string
}

const TodoList = React.memo((props: TodoListPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(tl => tl.id === props.todoListID)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()

    useEffect(() => {dispatch(GetTasksTC(props.todoListID))}, [props.todoListID])

    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.InProgress)
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const todolistTasks = tasks.map(t => {
        return (
            <Task
                key={t.id}
                todoListID={props.todoListID}
                taskID={t.id}
            />
        )
    })

    const onClickFilterHandler = useCallback((filter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(props.todoListID, filter))
    }, [props.todoListID])
    const onClickRemoveTodoListHandler = useCallback(() => {
        dispatch(RemoveTodolistTC(props.todoListID))
    }, [props.todoListID])
    const addTask = useCallback((title: string) => {
        dispatch(AddTaskTC(props.todoListID, title))
    }, [props.todoListID])
    const renameTodoList = useCallback((title: string) => {
        dispatch(RenameTodolistTC(props.todoListID, title))
    },[props.todoListID])

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} renameItem={renameTodoList} />
                <IconButton onClick={onClickRemoveTodoListHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItem
                addItem={addTask}
            />
            <div>
                {todolistTasks}
            </div>
            <div>
                <Button
                    color={'inherit'}
                    variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    size={'small'}
                    onClick={() => onClickFilterHandler('all')}
                >all
                </Button>
                <Button
                    color={'secondary'}
                    variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    size={'small'}
                    onClick={() => onClickFilterHandler('active')}>active
                </Button>
                <Button
                    color={'primary'}
                    variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    size={'small'}
                    onClick={() => onClickFilterHandler('completed')}>completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;