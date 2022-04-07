import React, {useCallback} from 'react';
import './App.css'
import {AddItem} from "./AddItem";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AddTaskAC, TaskType} from "./redux/tasksReducer";
import {
    ChangeTodolistFilterAC,
    FilterType,
    RemoveTodolistAC,
    RenameTodolistAC,
    TodolistType
} from "./redux/todolistsReducer";
import {AppRootStateType} from "./redux/store";
import {Task} from "./Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'

type TodoListPropsType = {
    todoListID: string
}

const TodoList = React.memo((props: TodoListPropsType) => {
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
        dispatch(RemoveTodolistAC(props.todoListID))
    }, [props.todoListID])
    const addTask = useCallback((title: string) => {
        dispatch(AddTaskAC(props.todoListID, title))
    }, [props.todoListID])
    const renameTodoList = useCallback((title: string) => {
        dispatch(RenameTodolistAC(props.todoListID, title))
    },[props.todoListID])

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.titleTD} renameItem={renameTodoList} />
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