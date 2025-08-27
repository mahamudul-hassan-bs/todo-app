import Todo from "./components/Todo";

function App() {
  return (
    <div className="flex flex-col p-4 justify-center w-full items-center">
      <h1 className="font-bold text-4xl text-teal-700 tracking-widest font-mono underline">
        ToDo App
      </h1>
      <Todo />
    </div>
  );
}

export default App;
