'use client';
import { useState } from "react"

export default function Todo(){
const [item,setItem] = useState('');
const [todos,setTodos] = useState([]);

function handle(){
    if(item.trim()){
        setTodos([...todos,item]);
        setItem('')
    }
}
const handleRemoveTodo = (index) => {
    const newTodos = [...todos]; // Make copy of todos
    newTodos.splice(index, 1);   // Remove one item at the index
    setTodos(newTodos);          // Update the todos
  };
    return(
        <>
            <input type="text" 
            onChange={(e)=>setItem(e.target.value)}
            placeholder="name"
            value={item}
            />
            <button onClick={handle} className="bg-blue-950 text-white">
        add todos
            </button>

            {todos.map((todos,index) => (
                <li key={index}>
                    {todos} <button className="bg-cyan-950 p-2"
                    onClick={handleRemoveTodo}
                    >x</button>
                </li>
            ))}
        </>
    )
}