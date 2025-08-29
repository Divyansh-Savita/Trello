import { useState } from "react";
import useLocalStorage from "./components/UseLocalStorage";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  labels: string[];
};

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const addTask = (): void => {
    if (!title.trim()) return;

    const labelsArray = labelInput
      .split(",")
      .map((lbl) => lbl.trim())
      .filter((lbl) => lbl.length > 0);

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "pending",
      labels: labelsArray,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
    setLabelInput("");
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

  // 🔹 Collect unique labels
  const uniqueLabels = Array.from(new Set(tasks.flatMap((task) => task.labels)));

  // 🔹 Filter tasks
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.labels.includes(filter));

  return (
    <>
      <h1>Task Manager</h1>

      {/* Input fields */}
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
      <input
        type="text"
        placeholder="Labels (comma separated, e.g. Work, Personal)"
        value={labelInput}
        onChange={(e) => setLabelInput(e.target.value)}
      />
      <button onClick={addTask}>➕ Add Task</button>

      {/* 🔹 Filter buttons */}
      <div style={{ margin: "16px 0" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            backgroundColor: filter === "all" ? "black" : "gray",
            color: "white",
            padding: "6px 12px",
            marginRight: "6px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          All
        </button>

        {uniqueLabels.map((lbl, idx) => (
          <button
            key={idx}
            onClick={() => setFilter(lbl)}
            style={{
              backgroundColor: filter === lbl ? "black" : "gray",
              color: "white",
              padding: "6px 12px",
              marginRight: "6px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {lbl}
          </button>
        ))}
      </div>

      {/* Task list */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            {/* Labels */}
            <div style={{ margin: "8px 0" }}>
              {task.labels.map((label, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#eee",
                    padding: "4px 8px",
                    marginRight: "6px",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  #{label}
                </span>
              ))}
            </div>

            {/* Status button */}
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

            {/* Delete button */}
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