import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

function App() {

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-[50px] font-bold mb-2">Type-The-Task</h1>
        <TodoForm />
        <TodoList />
      </div>
    </>
  )
}

export default App
