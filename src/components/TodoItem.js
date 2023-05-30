import axios from "axios";

export function TodoItem({ todo, setTodos }) {
  const onCheckChange = () => {
    axios
      .patch(`http://localhost:3500/todos/${todo._id}/mark-as-completed`)
      .then((res) =>
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === res.data._id ? res.data : todo))
        )
      )
      .catch((err) => console.log(err));
  };

  const onItemRemove = () => {
    axios
      .delete(`http://localhost:3500/todos/${todo._id}`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <li>
      <input
        type="checkbox"
        name="completed-checkbox"
        checked={todo.completed}
        onChange={onCheckChange}
      />

      <p>{todo.body}</p>

      <button
        className="btn delete-task-btn"
        onClick={onItemRemove}
        title="Delete Todo"
      >
        <img src="./images/icon-cross.svg" alt="" />
      </button>
    </li>
  );
}
