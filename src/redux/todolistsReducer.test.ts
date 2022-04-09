import {
    AddTodolistAC, ChangeTodolistFilterAC,
    RemoveTodolistAC, RenameTodolistAC,
    todolistsReducer,
    TodolistType
} from "./todolistsReducer";

let todolistsInitialState: TodolistType[]
beforeEach(() => {
    todolistsInitialState = [
        {id: "todolistsID1", addedDate: "2022", order: -1, title: "First TodoList", filter: 'all'},
        {id: "todolistsID2", addedDate: "2022", order: 0, title: "Second TodoList", filter: 'all'},
    ]
})

test('selected todolist should be removed', () => {
    const endState = todolistsReducer(todolistsInitialState, RemoveTodolistAC("todolistsID1"))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("Second TodoList")
})

test('todolist should be added', () => {
    const endState = todolistsReducer(todolistsInitialState, AddTodolistAC({
        id: "todolistID3",
        addedDate: "2022",
        order: -2,
        title: "New Todolist",
        filter: 'all'} as TodolistType))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("New Todolist")
})

test('todolist should be renamed', () => {
    const endState = todolistsReducer(todolistsInitialState, RenameTodolistAC("todolistsID2","New Title"))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("First TodoList")
    expect(endState[1].title).toBe("New Title")
})

test('todolist filter should be changed', () => {
    const endState = todolistsReducer(todolistsInitialState, ChangeTodolistFilterAC("todolistsID2","completed"))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
})