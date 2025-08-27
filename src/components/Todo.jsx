// import React, { useState } from "react";
// import useTodoStore from "../store/Store";

// const Todo = () => {
//   const [task, setTask] = useState("");

//   const todos = useTodoStore((state) => state.getFilteredTodos());
//   const addTodo = useTodoStore((state) => state.addTodo);
//   const toggleTodo = useTodoStore((state) => state.toggleTodo);
//   const removeTodo = useTodoStore((state) => state.removeTodo);

//   //   const todos = useTodoStore((state) => state.todos);
//   const setFilter = useTodoStore((state) => state.setFilter);
//   const filter = useTodoStore((state) => state.filter);
//   //   const todos = getTodos();
//   console.log(todos);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!task) {
//       return alert("Add a task");
//     }
//     addTodo(task);
//     setTask("");
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={() => setFilter("all")}>All</button>
//         <button onClick={() => setFilter("active")}>Active</button>

//         <button onClick={() => setFilter("completed")}>Completed</button>
//       </div>
//       <form action="" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//         />
//         <button type="submit">Add todo</button>
//       </form>
//       <div>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onClick={() => toggleTodo(todo.id)}
//             ></input>
//             <span>
//               {" "}
//               {todo.task} {todo.completed ? "✅" : "❌"}
//             </span>
//             <button onClick={() => removeTodo(todo.id)}>Delete Todo</button>
//           </li>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Todo;

import React, { useState } from "react";
import useTodoStore from "../store/Store";
import useInStore from "../store/Store2";

const Todo = () => {
  const [task, setTask] = useState("");

  const todos = useTodoStore((state) => state.todos);
  const filter = useInStore((state) => state.filter);
  const addTodo = useTodoStore((state) => state.addTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const setFilter = useInStore((state) => state.setFilter);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const remainingCount = useTodoStore((state) => state.remainingCount());

  const editingId = useInStore((state) => state.editingId);
  const setEditingId = useInStore((state) => state.setEditingId);
  const clearEditingId = useInStore((state) => state.clearEditingId);

  const filteredTodos = (() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  })();
  console.log(todos);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return alert("Add a task");
    addTodo(task);
    setTask("");
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    if (!task) return alert("Add a task");
    editTodo(id, task);
    setTask("");
    clearEditingId();
  };

  return (
    <div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add todo</button>
      </form>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, todo.id)}>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={clearEditingId}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>
                  {todo.task} {todo.completed ? "✅" : "❌"}
                </span>
                <button onClick={() => removeTodo(todo.id)}>Delete</button>
                <button
                  onClick={() => {
                    setTask(todo.task), setEditingId(todo.id);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <span>{remainingCount} items left</span>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default Todo;
