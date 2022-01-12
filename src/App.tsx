import React, {useState} from 'react';
import './App.css'
import TodoList from "./TodoList";
import {v1} from "uuid";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodoListType = Array<TaskType>

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TodoListType>([
        {id: v1(), title: "task1", isDone: true},
        {id: v1(), title: "task2", isDone: false},
        {id: v1(), title: "task3", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([...tasks, newTask])
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone} : t))
    }
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    let filteredTasks = [...tasks]
    if (filter === "active") {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                todoListTitle={"First TodoList"}
                todoList={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
