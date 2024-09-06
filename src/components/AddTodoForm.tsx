import React, { useState } from "react";

interface AddTodoFormProps {
    addTodo: (title: string, desc: string) => void;
}

/*
 * AddTodoForm: Create two input fields for title, and description string fields
 * As well as a submit button which creates the new To Do via addTodo 
 */
function AddTodoForm({ addTodo }: AddTodoFormProps) {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();  //Fix:  Prevent the default form submission
        if (title.trim() && desc.trim()) { //Fix: Ensure the title and description are not empty
            addTodo(title, desc);
            setTitle('');
            setDesc('');
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label> //Fix: For accessibility purposes
                <input
                    id="title" // Fix: For accessibility purposes
                    value={title} //Fix: missing value prop
                    type="text"
                    placeholder="Provide a title for the new To Do"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    id="description" // Fix: For accessibility purposes
                    value={desc}
                    placeholder="Briefly describe the To Do task"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add To Do</button>
        </form>
    );
}

export default AddTodoForm;