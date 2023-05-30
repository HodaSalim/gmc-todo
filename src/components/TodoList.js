import { TodoItem } from "./TodoItem";
import { TodosFooter } from "./TodosFooter";

export function TodoList({ todos, setTodos, setFilter }) {
  return (
    <section className="todo-list-section">
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>

      <TodosFooter todos={todos} setTodos={setTodos} setFilter={setFilter} />
    </section>
  );
}
