import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {ChangeTaskStatusAC, RemoveTaskAC, RenameTaskAC, TaskType} from "./redux/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

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
        <li key={props.taskID} className={task.isDone ? 'is-done' : ''}>
            <input type={"checkbox"} checked={task.isDone} onChange={changeTaskStatus}/>
            <EditableSpan title={task.title} renameItem={renameTask}/>
            <button onClick={() => removeTask(props.todoListID, props.taskID)}>x</button>
        </li>
    );
});