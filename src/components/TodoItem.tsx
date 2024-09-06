import React from "react";
import { Todo } from "@/types/todo";

interface TodoItemProps {
    todo: Todo;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
    toggleUrgent: (id: number) => void;
}

/* 
 * TodoItem: display each individual To Do item. Each one is an li element with the className set by To Do status.
 * These classNames correspond to the border color for the item (red = urgent, green = complete).
 * Each item has a title, description and 3 buttons to modify the To Do itself 
 */
function TodoItem({ todo, deleteTodo, toggleComplete, toggleUrgent }: TodoItemProps) {
    //Fix: Added a getClassName function to improve readability of the className logic:
    const getClassName = () => {
        if (todo.isCompleted) return "todo-item-complete";
        if (todo.isUrgent) return "todo-item-urgent";
        return "todo-item";
      };
    return (
        <li className={getClassName()}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <div className="todo-buttons">
            <button
                    onClick={() => toggleComplete(todo.id)}
                    aria-label={todo.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                >
                    {todo.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                <button 
                    aria-label={todo.isUrgent ? 'Mark as not Urgent' : 'Mark as Urgent'} // Fix: For accessibility purposes
                    onClick={() => toggleUrgent(todo.id)}>
                    {todo.isUrgent ? 'Mark as not Urgent' : 'Mark as Urgent'}
                </button>
                {/* Always allow the delete option */}
                <button 
                        aria-label={`Delete ${todo.title}`} // Fix: For accessibility purposes
                        onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </li>
    );
}

export default TodoItem;