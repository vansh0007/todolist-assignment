import Head from "next/head";
import React, { useCallback, useState } from "react";
import { Todo } from "@/types/todo";
import AddTodoForm from "@/components/AddTodoForm"
import TodoList from "@/components/TodoList";
import Banner from "@/components/Banner";
import sampleData from "@/sampleData.json";

/*
 * Home: renders the To Do list page. Which is essentially a form component for creating To Dos and 3 todo lists
 * Each TodoList renders TodoItem components for each todo passed in
 * The 3 lists are for urgent, non-urgent, and completed
 * 
 * There are also several utility functions
 * 
 * AddTodo - create a new To Do
 * deleteTodo - delete a To Do via supplied id
 * toggleProperty - toggles isCompleted or isUrgent for supplied id
 * displayTodoList - renders the TodoList component
 * displayTodos - calls displayTodoList with a filtered To Do selection
 * displayComplete - calls displayTodoList with a filtered To Do selection
 */
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(sampleData as Todo[]);

  const addTodo = (title: string, desc: string) => {
    // Fix: The AddTodo function is using todos.length + 1 for the new todo's id. This could potentially lead to duplicate ids if todos are deleted.
    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    const newTodo: Todo = {
      id: maxId + 1,
      title: title,
      description: desc,
      isCompleted: false,
      isUrgent: false,
    };

    // Fix: create a new array with the new todo added
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    // Fix: keep todos that do not match the id
    setTodos(todos.filter((todo) => todo.id !== id));
  };
    //Fix: The toggleProperty function is using direct mutation of the todo object, which is generally discouraged in React:
  const toggleProperty = useCallback((id: number, property: keyof Pick<Todo, 'isCompleted' | 'isUrgent'>) => {
    const updatedTodos = todos.map((todo) => 
      todo.id === id ? { ...todo, [property]: !todo[property] } : todo
    );
    setTodos(updatedTodos);
 
    //Fix:The dependency array in useCallback for toggleProperty should include todos, not setTodos:
  }, [todos]);

  const displayTodoList = (todoList:Todo[]) => {
    return (
      <TodoList
        todos={todoList}
        deleteTodo={deleteTodo} 
        toggleComplete={(id) => toggleProperty(id, 'isCompleted')} 
        toggleUrgent={(id) => toggleProperty(id, 'isUrgent')} 
      />
    );
  };

  const displayTodos = (displayUrgent: boolean) => {
    try {
      const filteredTodos = todos.filter((x) => !x.isCompleted && x.isUrgent === displayUrgent);
       return displayTodoList(filteredTodos);
    } catch (error) {
      console.error('Error in displayTodos:', error);
      return null; // or some fallback UI
    }
  };

  const displayComplete = () => {
    return displayTodoList(todos.filter((x) => x.isCompleted));
  };

  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="description" content="To Do List App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="Home">
        <Banner />
        <AddTodoForm addTodo={addTodo}/>
        {displayTodos(true)}
        {displayTodos(false)}
        {displayComplete()}
      </div>
    </>
  );
}
