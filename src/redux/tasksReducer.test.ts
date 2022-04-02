import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, RenameTaskAC, TasksListType, tasksReducer} from "./tasksReducer";

let tasksInitialState: TasksListType

beforeEach(() => {
    tasksInitialState = {
        ["todolistsID1"]: [{id: "id1", title: "task1", isDone: true},
            {id: "id2", title: "task2", isDone: false},
            {id: "id3", title: "task3", isDone: false}],
        ["todolistsID2"]: [{id: "id5", title: "task5", isDone: true},
            {id: "id6", title: "task6", isDone: false},
            {id: "id7", title: "task7", isDone: false},
            {id: "id8", title: "task8", isDone: true}],
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

    expect(endState["todolistsID2"][2].isDone).toBe(true)
})

test('task title should be changed', () => {
    const endState = tasksReducer(tasksInitialState, RenameTaskAC("todolistsID2", "id6", "New Title"))

    expect(endState["todolistsID2"][1].title).toBe("New Title")
})