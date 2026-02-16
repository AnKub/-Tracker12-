import React, {useState, useMemo} from 'react';

function complexCompute(num) {
  let i = 0
  while(i<1000000000)i++
  return num *2
}

function App (){
  const [number, setNumber] = useState(42)
  const [colored, setColored] = useState(false)

  const styles= useMemo(() => ({
    color: colored ? 'red' : 'black'
  }), [colored])

  const computed = useMemo(() => complexCompute(number), [number]) 
  
  
  
//   return (
//     <div>
//     <h1 style={styles}>{computed}</h1>

//     <button onClick={()=> setNumber(prev => prev + 1)}>Add</button>
//     <button onClick={()=> setNumber(prev => prev - 1)}>takeOff</button>
//     <button onClick={()=> setColored(prev => !prev)}>Change Color</button>
//     </div>
//   )
// }