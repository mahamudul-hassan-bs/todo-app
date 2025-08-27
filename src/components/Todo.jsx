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
//         <Button onClick={() => setFilter("all")}>All</Button>
//         <Button onClick={() => setFilter("active")}>Active</Button>

//         <Button onClick={() => setFilter("completed")}>Completed</Button>
//       </div>
//       <form action="" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//         />
//         <Button type="submit">Add todo</Button>
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
//             <Button onClick={() => removeTodo(todo.id)}>Delete Todo</Button>
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
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, PencilLine, Ban, Save } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const handleEditSubmit = (id) => {
    if (!task) return alert("Add a task");
    editTodo(id, task);
    setTask("");
    clearEditingId();
  };

  return (
    <div className="p-6 flex items-center justify-center h-full w-full flex-col gap-6">
      <div className="flex gap-2 items-center">
        <Button
          className="hover:cursor-pointer"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          className="bg-red-800 hover:cursor-pointer"
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          className="bg-green-800 hover:cursor-pointer"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      <div className=" shadow-lg rounded p-2 drop-shadow-lg flex items-center justify-center w-[350px]">
        <form
          className="flex flex-col gap-2 p-2 items-center "
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-2xl text-teal-900 tracking-wide font-mono">
            Add toDo!
          </h2>
          <Input
            type="text"
            className="p-2 bg-white h-15 border border-teal-900"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button type="submit" className="bg-teal-800 hover:cursor-pointer">
            Add todo
          </Button>
        </form>
      </div>
      {/* <Card className="flex justify-center  w-[250px]">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Task Id</CardTitle>
          <CardAction className="flex flex-row gap-2">
            <Button className=" bg-transparent drop-shadow-none shadow-none hover:scale-150 hover:bg-transparent hover:cursor-pointer ">
              <PencilLine color={"black"} />
            </Button>
            <Button className=" bg-transparent drop-shadow-none shadow-none hover:scale-150 hover:bg-transparent hover:cursor-pointer">
              <Trash2 color={"red"} />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card> */}
      <div className="flex flex-wrap gap-4">
        {filteredTodos.map((todo) => (
          // <li key={todo.id}>
          //   {editingId === todo.id ? (
          //     <form onSubmit={(e) => handleEditSubmit(e, todo.id)}>
          //       <input
          //         type="text"
          //         value={task}
          //         onChange={(e) => setTask(e.target.value)}
          //       />
          //       <Button type="submit">Save</Button>
          //       <Button type="Button" onClick={clearEditingId}>
          //         Cancel
          //       </Button>
          //     </form>
          //   ) : (
          //     <>
          //       <input
          //         type="checkbox"
          //         checked={todo.completed}
          //         onChange={() => toggleTodo(todo.id)}
          //       />
          //       <span>
          //         {todo.task} {todo.completed ? "✅" : "❌"}
          //       </span>
          //       <Button onClick={() => removeTodo(todo.id)}>Delete</Button>
          //       <Button
          //         onClick={() => {
          //           setTask(todo.task), setEditingId(todo.id);
          //         }}
          //       >
          //         Edit
          //       </Button>
          //     </>
          //   )}
          // </li>
          <Card key={todo.id} className="flex justify-center  w-[250px]">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Task_ID#{todo.id}</CardTitle>
              <CardAction className="flex flex-row gap-2">
                {editingId === todo.id ? (
                  <>
                    <Button
                      className=" bg-transparent drop-shadow-none shadow-none hover:scale-150 hover:bg-transparent hover:cursor-pointer "
                      onClick={() => handleEditSubmit(todo.id)}
                    >
                      <Save color={"green"} />
                    </Button>
                    <Button
                      className=" bg-transparent drop-shadow-none shadow-none hover:scale-150 hover:bg-transparent hover:cursor-pointer "
                      onClick={clearEditingId}
                    >
                      <Ban color={"red"} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className=" bg-transparent drop-shadow-none shadow-none hover:scale-150 hover:bg-transparent hover:cursor-pointer "
                      onClick={() => {
                        setTask(todo.task), setEditingId(todo.id);
                      }}
                    >
                      <PencilLine color={"black"} />
                    </Button>
                    <Button
                      className=" bg-transparent drop-shadow-none shadow-none hover:scale-150 hover:bg-transparent hover:cursor-pointer"
                      onClick={() => removeTodo(todo.id)}
                    >
                      <Trash2 color={"red"} />
                    </Button>
                  </>
                )}
              </CardAction>
            </CardHeader>
            <CardContent>
              {editingId === todo.id ? (
                <Input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              ) : (
                <div className="flex flex-row gap-2 items-center ">
                  {" "}
                  <Input
                    className="bg-transparent shadow-none size-4 "
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <p
                    className={
                      todo.completed ? "text-green-800 line-through" : ""
                    }
                  >
                    {todo.task}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <span className="font-bold text-lg text-red-700">
          {remainingCount} ToDos left
        </span>
        <Button onClick={clearCompleted}>Clear Completed</Button>
      </div>
    </div>
  );
};

export default Todo;
