import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
    RenameTodolistAC,
    todolistsReducer,
    TodolistType
} from "./todolistsReducer";

let todolistsInitialState: TodolistType[]
beforeEach(() => {
    todolistsInitialState = [
        {id: "todoListsID1", titleTD: "First TodoList", filter: 'all'},
        {id: "todoListsID2", titleTD: "Second TodoList", filter: 'all'},
    ]
})

test('selected todolist should be removed', () => {
    const endState = todolistsReducer(todolistsInitialState, RemoveTodolistAC("todoListsID1"))

    expect(endState.length).toBe(1)
    expect(endState[0].titleTD).toBe("Second TodoList")
})

test('todolist should be added', () => {
    const endState = todolistsReducer(todolistsInitialState, AddTodolistAC("New Todolist"))

    expect(endState.length).toBe(3)
    expect(endState[0].titleTD).toBe("New Todolist")
})

test('todolist should be renamed', () => {
    const endState = todolistsReducer(todolistsInitialState, RenameTodolistAC("todoListsID2","New Title"))

    expect(endState.length).toBe(2)
    expect(endState[0].titleTD).toBe("First TodoList")
    expect(endState[1].titleTD).toBe("New Title")
})

test('todolist filter should be changed', () => {
    const endState = todolistsReducer(todolistsInitialState, ChangeTodolistFilterAC("todoListsID2","completed"))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
})