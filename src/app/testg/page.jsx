'use client'; 
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([]);
  
  const handleAddTodo =() =>{
    if(name.trim()){
      setTodos([...todos, name]);
      setName('');
    }
  }
  return (
    <div className="flex-row justify-center align-middle">
      <input type="text"
      onChange={(e) =>setName(e.target.value)}
      className="border-l-rose-950 flex-col align-middle justify-center"
      placeholder="name"
      value={name}
      />
    <button className="bg-pink-950 text-white p-3 border-green-950" onClick={handleAddTodo}>click me</button>

{todos.map((todo,index)=>(
  
    <li key={index}>{todo}</li>
  
))}
  
    </div>
  );
}
