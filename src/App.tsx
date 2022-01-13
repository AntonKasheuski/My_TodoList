import React, {useState} from 'react';
import './App.css'
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItem} from "./AddItem";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string,
    titleTD: string,
    filter: FilterType
}
export type TasksListType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListsID1 = v1();
    const todoListsID2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListsID1, titleTD: "First TodoList", filter: 'all'},
        {id: todoListsID2, titleTD: "Second TodoList", filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksListType>({
        [todoListsID1]: [{id: v1(), title: "task1", isDone: true},
            {id: v1(), title: "task2", isDone: false},
            {id: v1(), title: "task3", isDone: false}],
        [todoListsID2]: [{id: v1(), title: "task5", isDone: true},
            {id: v1(), title: "task6", isDone: false},
            {id: v1(), title: "task7", isDone: false},
            {id: v1(), title: "task8", isDone: true}],
    })

    const removeTask = (taskID: string, todoListID: string) => {
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(tasksCopy)
    }
    const addTask = (title: string, todoListID: string) => {
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = [...tasks[todoListID], {id: v1(), title, isDone: false}]
        setTasks(tasksCopy)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks(tasksCopy)
    }
    const changeFilter = (filter: FilterType, todoListID: string) => {
        const filteredTodoLists = todoLists.map(tl =>
            tl.id === todoListID ? {...tl, filter} : tl)
        setTodoLists(filteredTodoLists)
    }
    const removeTodoList = (todoListID: string) => {
        const newTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(newTodoLists)
        const tasksCopy = {...tasks}
        delete tasksCopy[todoListID]
        setTasks(tasksCopy)
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1();
        setTodoLists([...todoLists, {id: newTodoListID, titleTD: title, filter: 'all'}])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const renameTask = (title: string, todoListID: string, taskID: string) => {
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = tasks[todoListID].map(t =>
            t.id === taskID ? {...t, title} : t)
        setTasks(tasksCopy)
    }

    const renameTodoList = (title: string, todoListID: string) => {
        const newTodoLists = todoLists.map(tl =>
            tl.id === todoListID ? {...tl, titleTD: title} : tl)
        setTodoLists(newTodoLists)
    }

    const todoListsRender = todoLists.map(tl => {
        let filteredTasks = [...tasks[tl.id]]
        if (tl.filter === "active") {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }
        return (
            <TodoList
                key={tl.id}
                todoListTitle={tl.titleTD}
                todoListID={tl.id}
                todoListTasks={filteredTasks}
                filter={tl.filter}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeFilter={changeFilter}
                removeTodoList={removeTodoList}
                renameTask={renameTask}
                renameTodoList={renameTodoList}
            />
        )
    })

    return (
        <div className="App">
            <AddItem
                addItem={addTodoList}
            />
            {todoListsRender}
        </div>
    );
}

export default App;
