import React from "react";
import { useState } from "react";
import './TicTac.scss'; 

export default function Square({value}){
  const[value, setValue] = useState(null);

  function handleClick(){
    console.log('Clicked')
  }

  return (
         <button 
         className="square"
         onClick={handleClick}
         >
          {value}
          </button>
  )
}