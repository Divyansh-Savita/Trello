import { useState } from 'react'
import './App.css'

function App() {
  
  type Item = { id: number; text: string };
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");
  
  const addnumber = (): void => {
    
    let newItem = {
      id: Date.now(),
      text: text,
    };
    setItems((prev) => [...prev, newItem]);
    setText("");
  };

  const deletenumber = (idToDelete: number): void => {
    setItems((prev) => prev.filter(item => item.id !== idToDelete));
  };

  return (
      <>
      <h1>Trello</h1>            
      <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={addnumber}>CLick me</button>
      
        {items.map((val) => (
          <li key={val.id}>
            {val.text}{" "}
            <button onClick={() => deletenumber(val.id)}>delete</button>
          </li>
        ))}
        
      
    </>
  )
};

export default App
