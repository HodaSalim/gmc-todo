import React, { useState } from "react";

import { useFetch } from "./hooks/useFetch";

import { Header } from "./components/Header";
import { NewTodo } from "./components/NewTodo";
import { TodoList } from "./components/TodoList";

function App() {
  const [filter, setFilter] = useState("all");

  const {
    data: todos,
    setData: setTodos,
    isLoading,
    error,
  } = useFetch("/", {
    params: {
      status: filter,
    },
  });

  return (
    <>
      <Header />

      <main>
        <NewTodo setTodos={setTodos} />

        {isLoading || todos ? (
          isLoading ? (
            <p>Loading</p>
          ) : todos.length === 0 ? (
            <p>No todos</p>
          ) : (
            <TodoList todos={todos} setTodos={setTodos} setFilter={setFilter} />
          )
        ) : error ? (
          <p>Error</p>
        ) : null}
      </main>
    </>
  );
}

export default App;
