import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  // Initialize todos with a function that reads from localStorage
  const [todos, setTodos] = useState(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      return todos;
      }
      
    
    return [];
  });
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(true);

  // Save todos to local storage whenever `todos` state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    
  }, [todos]);

  const ToggleFinished = (params) => {
    setShowFinished(!showFinished)
    
  }
  

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");

  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="md:mx-auto mx-3 my-10 p-5 rounded-xl bg-purple-200 min-h-[80vh] md:w-1/2 ">
       <h1 className='font-bold text-center text-xl'>Tasker - Manage your Tasks at one Place</h1>
        <div className="addTodo ms-10">
          <h2 className='text-lg font-bold my-3 mt-5'>Add Todo</h2>
          <input onChange={handleChange} value={todo} className='md:w-7/12 lg:w-9/12 w-1/2 p-2 rounded-md' type="text" />
          <button onClick={handleAdd}disabled={todo.length<5} className='bg-purple-800 hover:bg-purple-950 px-5 py-2.5 text-white text-sm font-bold rounded-md mx-4'>Add</button>
        </div>
        <input onChange={ToggleFinished} type="checkbox" checked={showFinished} className='mt-5 ms-10' /> Show Finished
        <h2 className='text-lg font-bold my-4 ms-10'>Your Todos</h2>
        <div className="todos ms-10">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => { return(showFinished || !item.isCompleted)&&
            <div key={item.id} className="todo flex md:w-10/12 justify-between my-3">
              <div className='flex gap-5 items-center justify-center'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-purple-800 hover:bg-teal-950 px-2 py-2 text-white text-sm font-bold rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-purple-800 hover:bg-teal-950 px-2 py-2 text-white text-sm font-bold rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
         } )}
        </div>
      </div>
    </>
  );
}

export default App;
