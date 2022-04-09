import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {ChangeTaskStatusAC, RemoveTaskAC, RenameTaskAC} from "./redux/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from "./api/task-api";

type TaskPropsType = {
    todoListID: string
    taskID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListID].find(t => t.id === props.taskID) as TaskType)
    const dispatch = useDispatch()

    const removeTask = useCallback((todoListID: string, taskID: string) => {
        dispatch(RemoveTaskAC(todoListID, taskID))
    }, [])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusAC(props.todoListID, props.taskID, e.currentTarget.checked))
    }, [props.todoListID, props.taskID])
    const renameTask = useCallback((title: string) => {
        dispatch(RenameTaskAC(props.todoListID, props.taskID, title))
    }, [props.todoListID, props.taskID])

    return (
        <div key={props.taskID} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatus}/>
            <EditableSpan title={task.title} renameItem={renameTask}/>
            <IconButton onClick={() => removeTask(props.todoListID, props.taskID)}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
});