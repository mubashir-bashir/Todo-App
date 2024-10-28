import React from "react";
import Navbar from "./components/Navbar";
import { useState ,useEffect} from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null)
  const [showFinished , setShowFinished ] = useState(true)


    useEffect(() => {
      let todoString = localStorage.getItem("todos")
      if(todoString){
        let todos = JSON.parse(todoString)
        setTodos(todos)
      }


    }, [])
    


   
  const saveToLs =()=>{
      localStorage.setItem("todos", JSON.stringify(todos))
  }
      
const toggleFinished =()=>{
  setShowFinished(!showFinished)
}

  const handleAdd = () => { 
    if(editIndex !== null){
     const updatedTodos = todos.map((item,ind)=>{
       return  (ind === editIndex? {...item,todo} : item)
      })
      setTodos(updatedTodos)
      setEditIndex(null)
      saveToLs()
    }

    else{
      setTodos([...todos, { todo, isCompleted: false }]);
    }
    
    
    saveToLs()
    setTodo("");
  };
  const handleChange = (e) => {

    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let indexs = e.target.dataset.index; // Get the index
    let toggle = !todos[indexs].isCompleted; // Determine new status

    let newTodos = [...todos];
    newTodos[indexs].isCompleted = toggle;

    setTodos(newTodos);
    saveToLs()
  };

  const handleEdit = (i) => {
    setTodo(todos[i].todo)

    setEditIndex(i)
    saveToLs()
    
    
  };

  const handleDelete = (index) => {
    let cn = confirm("Do you want to delele your Todo?")
    if(cn){const newTodos = todos.filter((item, i) => {
      return i != index;
    });

    setTodos(newTodos);
    saveToLs()
  }
  };

  return (
    <>
      <Navbar />
      <div className=" w-full md:container bg-sky-500 mx-auto mt-8 border rounded-xl p-8 md:w-[60vw]">
        <div className="addTodo">
          <h2 className="font-bold text-lg">Add a Todo</h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="w-[80%] rounded-lg focus:outline-8 px-4 focus:outline-blue-600 focus:px-4 py-2"
          />
          <button
            className="bg-blue-400 py-2 px-4 rounded-lg font-semibold mx-4 disabled:bg-blue-200"
            onClick={handleAdd} disabled= {todo.length<3}
          >
            Add
          </button>
        </div>
        <h2 className="font-bold text-lg mt-8 m-auto w-full justify-center flex">
         {todos.length>0? "Your Todos ":"No Todos To Display "} 
        </h2>
        <div className="finished">
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        </div>
        
        <div className="todos flex flex-col m-auto w-full mt-8 items-center">
          {todos.map((items, index) => {
            return (showFinished || !items.isCompleted) && 
              <div
                className="todo flex  items-center w-[72%] my-4 "
                key={index}
              >
                <input
                  type="checkbox"
                  data-index={index}
                  onChange={handleCheckbox}
                />
                <div
                  className={`text w-[90%] mx-4  ${items.isCompleted ? "line-through " : ""}`}
                >
                  {items.todo}
                </div>
                <div className="btn flex">
                  <button
                    className="bg-blue-400 py-2 px-4 rounded-lg font-semibold mx-1"
                    onClick={()=>handleEdit(index)}
                  >
                  <FaEdit />
                  </button>
                  <button
                    className="bg-blue-400 py-2 px-4 rounded-lg font-semibold mx-4"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    <MdDelete />

                  </button>
                </div>
              </div>
            
          })}
        </div>
      </div>
    </>
  );
};

export default App;
