import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, RenameTaskAC, TasksListType, tasksReducer} from "./tasksReducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolistsReducer";
import {TaskStatuses} from "../api/task-api";

let tasksInitialState: TasksListType
beforeEach(() => {
    tasksInitialState = {
        ["todolistsID1"]: [
            {
                id: "id1",
                title: "task1",
                description: "null",
                todoListId: "todolistsID1",
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
                todoListId: "todolistsID1",
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
                todoListId: "todolistsID1",
                order: 0,
                status: 1,
                priority: 1,
                startDate: "2022",
                deadline: "2022",
                addedDate: "2022"
            }],
        ["todolistsID2"]: [
            {
                id: "id5",
                title: "task5",
                description: "null",
                todoListId: "todolistsID2",
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
                todoListId: "todolistsID2",
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
                todoListId: "todolistsID2",
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
                todoListId: "todolistsID2",
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
    const endState = tasksReducer(tasksInitialState, RemoveTaskAC("todolistsID2", "id6"))

    expect(endState["todolistsID2"].length).toBe(3)
    expect(endState["todolistsID1"].length).toBe(3)
    expect(endState["todolistsID2"][1].title).toBe("task7")
})

test('task should be added', () => {
    const endState = tasksReducer(tasksInitialState, AddTaskAC("todolistsID2", "New Task"))

    expect(endState["todolistsID2"].length).toBe(5)
    expect(endState["todolistsID1"].length).toBe(3)
    expect(endState["todolistsID2"][0].title).toBe("New Task")
})

test('task status should be changed', () => {
    const endState = tasksReducer(tasksInitialState, ChangeTaskStatusAC("todolistsID2", "id7", true))

    expect(endState["todolistsID2"][2].status).toBe(TaskStatuses.Completed)
})

test('task title should be changed', () => {
    const endState = tasksReducer(tasksInitialState, RenameTaskAC("todolistsID2", "id6", "New Title"))

    expect(endState["todolistsID2"][1].title).toBe("New Title")
})

test('empty task array should be added when new todolist is created', () => {
    const endState = tasksReducer(tasksInitialState, AddTodolistAC("New Todolist"))

    expect(endState["newID"]).toBeDefined()
})
test('task array of removed todolist should be removed', () => {
    const endState = tasksReducer(tasksInitialState, RemoveTodolistAC("todolistsID1"))

    expect(endState["todolistsID1"]).toBeUndefined()
    expect(endState["todolistsID2"]).toBeDefined()
})