import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./components/EditableSpan";
import {
    ChangeTaskStatusTC, DomainTaskType,
    RemoveTaskTC,
    RenameTaskTC
} from "./redux/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from "./api/task-api";

type TaskPropsType = {
    todoListID: string
    taskID: string
    disabled: boolean
}

export const Task = React.memo((props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, DomainTaskType>(state => state.tasks[props.todoListID].find(t => t.id === props.taskID) as DomainTaskType)
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
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeTaskStatus}
                disabled={props.disabled || task.entityStatus}
            />
            <EditableSpan
                title={task.title}
                renameItem={renameTask}
                disabled={props.disabled || task.entityStatus}
            />
            <IconButton
                onClick={() => removeTask(props.todoListID, props.taskID)}
                disabled={props.disabled || task.entityStatus}
            >
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});