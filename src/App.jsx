import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskBoard from "./components/TaskBoard";

function App() {
  const [count, setCount] = useState(0)

  return  (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-blue-600 text-white p-4 text-2xl font-bold shadow">
        🗂️ Task Manager
      </header>
      <TaskBoard />
    </div>
  );
}

export default App
