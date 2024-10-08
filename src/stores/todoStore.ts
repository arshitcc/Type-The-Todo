import { create } from "zustand";
import { Todo } from "../types/todo";

export interface TodoState { 
    todos : Todo[],
    addTodo : (todo : Todo) => void,
    editTodo : (_id : string, updatedTodo : Partial<Todo>) => void,
    removeTodo : (_id : string) => void,
    toggleTodo : (_id : string) => void,
    setTodos : (todos : Todo[]) => void,
    currentTodo? : Todo | null,
    setCurrentTodo? : (todo : Todo|null) => void
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: JSON.parse(localStorage.getItem("todos") || "[]"),
    addTodo : (todo) => {
        set((state) => {
            const updatedTodos = [...state.todos,todo];
            localStorage.setItem('todos', JSON.stringify(updatedTodos))
            return {todos : updatedTodos}
        })
    },
    editTodo : (_id, updatedTodo) => {
        set((state) => {
            const updatedTodos = state.todos.map((todo) => (
                todo._id===_id ? {...todo,...updatedTodo} : todo
            ))
            return {todos : updatedTodos}
        })
    },
    removeTodo : (_id) => {
        set((state) => {
            const updatedTodos = state.todos.filter((todo) => (
                todo._id!==_id
            ))
            localStorage.setItem('todos',JSON.stringify(updatedTodos))
            return {todos : updatedTodos}
        })
    },
    toggleTodo : (_id) => {
        set((state) => {
            const updatedTodos = state.todos.map((todo) => (
                todo._id===_id? {...todo, isCompleted : !todo.isCompleted}:todo
            )) 
            localStorage.setItem('todos', JSON.stringify(updatedTodos))
            return {todos : updatedTodos}
        })
    },
    setTodos : (todos) => {
        set(() => ({todos}))
    },
    setCurrentTodo : (todo) => {
        set((state) => {
            state.currentTodo = todo
            return { currentTodo : todo}
        })
    }
   
}))