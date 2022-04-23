import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./components/EditableSpan";
import {
    ChangeTaskStatusTC,
    RemoveTaskTC,
    RenameTaskTC
} from "./redux/tasksReducer";
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
        dispatch(RemoveTaskTC(todoListID, taskID))
    }, [])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusTC(props.todoListID, task, e.currentTarget.checked))
    }, [props.todoListID, task])
    const renameTask = useCallback((title: string) => {
        dispatch(RenameTaskTC(props.todoListID, task, title))
    }, [props.todoListID, task])

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