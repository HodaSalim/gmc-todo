import { useState, useEffect } from "react";
import axios from "axios";

export function TodosFooter({ todos, setFilter, setTodos }) {
  const [numOfActiveTodos, setNumOfActiveTodos] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3500/todos/active")
      .then((res) => setNumOfActiveTodos(res.data.numberOfActiveTodos))
      .catch((err) => console.log(err));
  }, [todos]);

  const clearTodos = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.completed === false)
    );
  };

  return (
    <div className="todo-list-footer">
      <p className="active-tasks">{numOfActiveTodos} items left</p>

      <div className="todos-filter">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <button className="todos-clear" onClick={clearTodos}>
        Clear Completed
      </button>
    </div>
  );
}
