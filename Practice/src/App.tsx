import { useState } from 'react'
import './App.css'
import useLocalStorage from './components/UseLocalStorage';

function App() {

  type Item = { id: number; text: string; completed: boolean };
  const [items, setItems] = useLocalStorage<Item[]>("tasks", []);
  const [text, setText] = useState("");


  const addTask = (): void => {

    let newItem = {
      id: Date.now(),
      completed: false,
      text: text,
    };
    setItems((prev) => [...prev, newItem]);
    setText("");
  };

  const deleteTask = (idToDelete: number): void => {
    setItems((prev) => prev.filter(item => item.id !== idToDelete));
  };
  const toggleCompletion = (id: number): void => {
  setItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
  );
};
  return (
    <>
      <h1>Trello</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTask}>CLick me</button>

      {items.map((val) => (
        <li key={val.id}>
          {val.text}{" "}
          <button onClick={() => deleteTask(val.id)}>delete</button>{" "}
          <button
      onClick={() => toggleCompletion(val.id)}
      style={{
        padding: "10px 20px",
        margin: "10px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: val.completed ? "green" : "red",
        color: "white",
      }}
    >
      {val.completed ? "Completed" : "Pending"}
       </button>
        </li>
      ))}


    </>
  )
};

export default App
