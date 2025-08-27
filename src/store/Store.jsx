import { create } from "zustand";
import { persist } from "zustand/middleware";

const initiallyTodos = {
  todos: [],
};

const useTodoStore = create(
  persist((set, get) => ({
    // state: lists of all todos
    ...initiallyTodos,

    //Add new todo
    addTodo: (task) =>
      set((state) => ({
        todos: [
          ...state.todos,
          { id: Math.ceil(Math.random() * 10000), task, completed: false },
        ],
      })),

    //edit todo
    editTodo: (id, newTask) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, task: newTask } : todo
        ),
      })),

    //toggle todo completion
    toggleTodo: (id) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      })),

    //remove a todo
    removeTodo: (id) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),

    // //set filter
    // setFilter: (val) => set({ filter: val }),

    //get Filtered todos
    // getFilteredTodos: () => {
    //   const { todos, filter } = get();

    //   if (filter === "active") {
    //     return todos.filter((todo) => !todo.completed);
    //   }
    //   if (filter === "completed") {
    //     return todos.filter((todo) => todo.completed);
    //   }
    //   return todos;
    // },

    clearCompleted: () => {
      set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
      }));
    },

    //remaining count
    remainingCount: () => get().todos.filter((todo) => !todo.completed).length,
  })),
  {
    name: "todo-storage",
    getStorage: () => localStorage,
  }
);

export default useTodoStore;
