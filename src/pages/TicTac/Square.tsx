
import { useState } from "react";
import './TicTac.scss'; 

export default function Square({value, onSquareClick}){
 
  return (
         <button 
         className="square"
         onClick={onSquareClick}         
         >
          {value}
          </button>
  )
}