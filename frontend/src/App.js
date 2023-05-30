import React, { useEffect, useState } from "react";
import axios from "axios";

import { Header } from "./components/Header";
import { NewTodo } from "./components/NewTodo";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:3500/todos", {
        params: {
          status: filter,
        },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, [filter]);

  return (
    <>
      <Header />

      <main>
        <NewTodo setTodos={setTodos} />

        <TodoList todos={todos} setTodos={setTodos} setFilter={setFilter} />
      </main>
    </>
  );
}

export default App;
