import {AddTaskAC, RemoveTaskAC, TasksListType, tasksReducer, UpdateTaskAC} from "./tasksReducer";
import {AddTodolistAC, RemoveTodolistAC, TodolistType} from "./todolistsReducer";
import {TaskStatuses} from "../api/task-api";

let tasksInitialState: TasksListType
beforeEach(() => {
    tasksInitialState = {
        ["todolistID1"]: [
            {
                id: "id1",
                title: "task1",
                description: "null",
                todoListId: "todolistID1",
                order: -2,
                status: 2,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            },
            {
                id: "id2",
                title: "task2",
                description: "null",
                todoListId: "todolistID1",
                order: -1,
                status: 1,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            },
            {
                id: "id3",
                title: "task3",
                description: "null",
                todoListId: "todolistID1",
                order: 0,
                status: 1,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            }],
        ["todolistID2"]: [
            {
                id: "id5",
                title: "task5",
                description: "null",
                todoListId: "todolistID2",
                order: -3,
                status: 2,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            },
            {
                id: "id6",
                title: "task6",
                description: "null",
                todoListId: "todolistID2",
                order: -2,
                status: 1,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            },
            {
                id: "id7",
                title: "task7",
                description: "null",
                todoListId: "todolistID2",
                order: -1,
                status: 1,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            },
            {
                id: "id8",
                title: "task8",
                description: "null",
                todoListId: "todolistID2",
                order: 0,
                status: 2,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            }],
    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(tasksInitialState, RemoveTaskAC("todolistID2", "id6"))

    expect(endState["todolistID2"].length).toBe(3)
    expect(endState["todolistID1"].length).toBe(3)
    expect(endState["todolistID2"][1].title).toBe("task7")
})

test('task should be added', () => {
    const endState = tasksReducer(tasksInitialState, AddTaskAC("todolistID2", {
        id: "id9",
        title: "New Task",
        description: "null",
        todoListId: "todolistID2",
        order: 0,
        status: 1,
        priority: 1,
        startDate: "2022",
        deadline: "2022",
        addedDate: "2022"
    }))

    expect(endState["todolistID2"].length).toBe(5)
    expect(endState["todolistID1"].length).toBe(3)
    expect(endState["todolistID2"][0].title).toBe("New Task")
})

test('task status should be changed', () => {
    const endState = tasksReducer(tasksInitialState, UpdateTaskAC("todolistID2", {
        id: "id7",
        title: "task7",
        description: "null",
        todoListId: "todolistID2",
        order: -1,
        status: 2,
        priority: 1,
        startDate: "2022",
        deadline: "2022",
        addedDate: "2022"
    }))

    expect(endState["todolistID2"][2].status).toBe(TaskStatuses.Completed)
})

test('task title should be changed', () => {
    const endState = tasksReducer(tasksInitialState, UpdateTaskAC("todolistID2", {
        id: "id6",
        title: "New Title",
        description: "null",
        todoListId: "todolistID2",
        order: -2,
        status: 1,
        priority: 1,
        startDate: "2022",
        deadline: "2022",
        addedDate: "2022"
    }))

    expect(endState["todolistID2"][1].title).toBe("New Title")
})

test('empty task array should be added when new todolist is created', () => {
    const endState = tasksReducer(tasksInitialState, AddTodolistAC({
        id: "todolistID3",
        addedDate: "2022",
        order: -2,
        title: "New TodoList",
        filter: 'all'} as TodolistType))

    expect(endState["todolistID1"]).toBeDefined()
    expect(endState["todolistID2"]).toBeDefined()
    expect(endState["todolistID3"]).toBeDefined()
    expect(endState["todolistID3"].length).toBe(0)
})
test('task array of removed todolist should be removed', () => {
    const endState = tasksReducer(tasksInitialState, RemoveTodolistAC("todolistID1"))

    expect(endState["todolistID1"]).toBeUndefined()
    expect(endState["todolistID2"]).toBeDefined()
})