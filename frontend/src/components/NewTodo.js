import { useState } from "react";
import axios from "axios";

export function NewTodo({ setTodos }) {
  const [content, setContent] = useState("");

  const onAddTodo = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3500/todos", {
        data: {
          body: content,
          completed: false,
        },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <form className="form-control" onSubmit={onAddTodo}>
      <input
        className="todo-input"
        id="todo-input"
        placeholder="Create a new todo..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  );
}
