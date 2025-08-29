import { useState } from "react";
import useLocalStorage from "./components/UseLocalStorage";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
};

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (): void => {
    if (!title.trim()) return; // prevent empty tasks
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "pending",
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleStatus = (id: number): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "pending"
                  ? "in-progress"
                  : task.status === "in-progress"
                  ? "completed"
                  : "pending",
            }
          : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "in-progress":
        return "blue";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <>
      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTask}>➕ Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button
              onClick={() => toggleStatus(task.id)}
              style={{
                backgroundColor: getStatusColor(task.status),
                color: "white",
                padding: "8px 16px",
                marginRight: "8px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {task.status}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
