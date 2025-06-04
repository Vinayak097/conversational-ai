import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Conversation from './Conversation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-amber-500'>
        <Conversation></Conversation>
        
      </div>
    </>
  )
}

export default App
