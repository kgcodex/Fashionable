import { useState } from 'react'
import Navbar from './components/Navbar'
import StoreOverview from './components/StoreOverview'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-100 h-screen w-full p-5 flex flex-col gap-5">
      <Navbar />
      <StoreOverview />
    </div>
  )
}

export default App
