import {RemoveTodolistAC, todolistsReducer, TodolistType} from "./todolistsReducer";

test('selected todolist should be removed', () => {

    const todolistsInitialState: TodolistType[] = [
        {id: "todoListsID1", titleTD: "First TodoList", filter: 'all'},
        {id: "todoListsID2", titleTD: "Second TodoList", filter: 'all'},
    ]

    const endState = todolistsReducer(todolistsInitialState, RemoveTodolistAC("todoListsID2"))

    expect(endState.length).toBe(1)
    expect(endState[0].titleTD).toBe("First TodoList")
})