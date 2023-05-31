import { useFetch } from "../hooks/useFetch";

export function TodosFooter({ todos, setFilter, setTodos }) {
  const { data, isLoading, error } = useFetch("/active");

  const clearTodos = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.completed === false)
    );
  };

  return (
    <div className="todo-list-footer">
      <p className="active-tasks">
        {isLoading
          ? "Loading..."
          : error
          ? error
          : data
          ? `${data.numberOfActiveTodos} items left`
          : ""}
      </p>

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
