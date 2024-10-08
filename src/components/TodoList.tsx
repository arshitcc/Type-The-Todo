import { useTodoStore } from "../stores/todoStore";
// import { useState } from "react";
import { Button } from "./ui/button";
import { CircleXIcon, PencilRulerIcon, SquareCheckBigIcon, RotateCcwIcon } from "lucide-react";
// import { Todo } from "@/types/todo";

export const TodoList = () => {

  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const setCurrentTodo = useTodoStore((state) => state.setCurrentTodo);

  return (
    <div className="mt-12 p-8 bg-zinc-500 rounded-xl">
      {todos.length === 0 ? (
        <p>NO TASKS !!</p>
      ) : (
        <ul className="space-y-4 overflow-hidden">
          {todos.map((todo) => (
            <li key={todo._id} className="grid grid-cols-1 grid-rows-4 md:grid-cols-8 md:grid-rows-1 justify-between items-center border border-gray-900 rounded-sm p-2">
              <div className="row-span-3 col-span-6 text-left">
                <h3 className={`text-lg font-bold ${todo.isCompleted ? "line-through" : ""}`}>
                  {todo.title}
                </h3>
                <p>{todo.description}</p>
              </div>
              <div className="row-span-1 col-span-2 grid grid-cols-3 gap-2 items-center">
                <Button onClick={() => setCurrentTodo?.(todo)}>
                  <PencilRulerIcon/>
                </Button>
                <Button onClick={() => toggleTodo(todo._id)} className={`  ${todo.isCompleted? 'bg-zinc-800 hover:bg-zinc-800' : 'bg-green-500 hover:bg-green-500'}`}>
                  {todo.isCompleted ? <RotateCcwIcon/> : <SquareCheckBigIcon/>}
                </Button>
                <Button onClick={() => removeTodo(todo._id)} variant="destructive">
                  <CircleXIcon/>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
