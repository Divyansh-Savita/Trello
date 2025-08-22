import { useState } from 'react'
import './App.css'

function App() {
  
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState("");
  
  const addnumber=():void=>{
    setItems((prev)=>[...prev,text])
    
  }
  const deletenumber=(StrToDelete:String):void=>{
    setItems(prev=>prev.filter(str=>str!==StrToDelete))
  }

  return (
      <>
      <h1>Trello</h1>
      <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={addnumber}>CLick me</button>
      
      <ul>
        {items.map((val,index)=>(
          <li key={index}>{val} {" "} <button onClick={()=>(deletenumber(val))}>delete</button>
          </li>

        ))}
      </ul>
    </>
  )
};

export default App
