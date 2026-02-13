import React, {useState, useEffect} from 'react';

function App() {
  const [type, setType] = useState('user')
  const [data, setData] = useState([])
  const [pos, setPos] = useState({x:0, y:0})
  
  const mouseMoveHandler = event => {
       setPos({x: event.clientX, y:event.clientY})
  }
  
 useEffect(()=>{
  fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => setData(json))

      return ()=>{
        console.log('clean all')
      }
  }, [type])

 useEffect(()=>{
  console.log('ComponentDidMount')
  window.addEventListener('mousemove', mouseMoveHandler)
 

  return () => {
    window.removeEventListener('mousemove', mouseMoveHandler)
  }
 }, [])



  return (
    <h1>{type}</h1>

    <button onClick={()=> setType('users')}>Users </button>
    <button onClick={()=> setType('posts')}>Posts</button>
    <button onClick={()=> setType('todos')}>Todos </button>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}