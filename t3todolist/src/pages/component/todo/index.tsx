// TodoList.js
import React, { useState } from 'react';
import { api } from "~/utils/api";

export interface Todo {
  id: number;
  description: string | null; // Allow null for description
  createdAt: string;
  dueTime: string | null;
  status: boolean | null;
}

export interface TodoData {
  todos: Todo[];
}

export default function TodoList() {

  const todoQuery = api.post.todo.useQuery();
  const todo: TodoData = todoQuery.data ?? { todos: [] };

  // Sort todos by createdAt in descending order
  const sortedTodos = todo.todos.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });

  const todoUpdateQuery = api.post.updateTodo.useMutation();
  const todoInsertQuery = api.post.insertTodo.useMutation();

  // Function to handle checkbox change
  const handleCheckboxChange = (todo: Todo) => {
    todoUpdateQuery.mutate({ id:todo.id, status: !todo.status });
    window.location.reload();
  };


  const [newTodoID, setNewTodoID] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const handleInsertTodo = async () => {
    const newTodo = {
      id: Number(newTodoID),
      description: newTodoDescription,
    };

    // Perform the insertion logic (replace with your actual logic)
    // For example, assuming there's an insertTodo mutation:
    // const result = await api.post.insertTodo.useMutation(newTodo);
    console.log(newTodo.id, newTodo.description);
    todoInsertQuery.mutate({ id:Number(newTodoID), description:newTodoDescription});
    // After the insertion, refetch the todo list

    // Clear the input fields after inserting
    setNewTodoID('');
    setNewTodoDescription('');
    window.location.reload();
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl">Todo List</h1>
      <div>
        <label>
          Enter a 4-digit id number:
          <input
            type="number"
            className="text-black"
            value={newTodoID}
            onChange={(e) => setNewTodoID(e.target.value)}
            min="1000"
            max="9999"
            pattern="\d{4}"
            title="Please enter a 4-digit number."
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            className="text-black"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          />
        </label>
      </div>
      <button type="button" onClick={handleInsertTodo}>
        Insert Todo
      </button>

      <ul >
        {sortedTodos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.status ?? false} onChange={() => handleCheckboxChange(todo)} />
            <span>{todo.description ?? 'No description'}</span>
            <span> ---- </span>
            <span>{todo.dueTime ? `Due: ${todo.dueTime}` : 'No due date'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
