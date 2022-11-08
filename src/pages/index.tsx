import { useEffect, useReducer, useState } from "react"
import AddTask from "../components/addtask"
import TodoList from "../components/todoList"

export default function Home() {

  const [todoState, dispatch] = useReducer(reducer, initialValue)
  const [todoClone, setTodoClone] = useState(todoState)

  console.log(todoState, todoClone)
  //input value is routed here
  const handleAdd = (todo: any) => {
    //handle add will run dispatch function with value type, id, and value from input
      dispatch({
        type: ACTION.ADD_TODO,
        id: nextId++,
        todoValue: todo,
      })
    
  }

  const handleEdit = (todo: { id: number, todoValue: string, status: boolean }) => {
    dispatch({
      type: ACTION.EDIT_TODO,
      todo: todo
    })
  }

  //delete action
  const handleDelete = (idx: any) => {
    dispatch({
      type: ACTION.DELETE_TODO,
      id: idx
    })
  }

  const handleAll = () => {
    setTodoClone(todoState)
    dispatch({
      type: ACTION.HANDLE_ALL,
      arr: todoClone
    })
    console.log(todoClone)
  }

  const handleDone = (idx: any) => {
    const updated = todoState.filter((_:{id: number, todoValue: string, status: boolean}, index: number)=> index === idx )

    setTodoClone(updated)
    dispatch({
      type: ACTION.DONE,
      id: todoClone.id,
      todoValue: todoClone.todoValue,
      status: todoClone.status,
    })


  }

  const handleTodo = () => {

  }

  const handleDeleteDone = () => {

  }
  //Delete all
  const handleDeleteAll = () => {   
    dispatch({
      type: ACTION.DELETE_ALL,
    })
  }

  // console.log(todoState)
  return (
    <div className="bg-black h-screen w-full">
      <div className=' flex flex-row justify-center p-5'>
        <div className="bg-white flex flex-col rounded-lg ring-2 place-items-center w-1/2 h-full ">
          <AddTask
            handleAdd={handleAdd}
          />
          <TodoList
            todoState={todoState}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAll={handleAll}
            handleDone={handleDone}
            dispatch={dispatch}
            handleDeleteAll={handleDeleteAll}
          />
        </div>
      </div>
    </div>

  )
}

const ACTION = {
  ADD_TODO: 'add_todo',
  EDIT_TODO: 'change_todo',
  DELETE_TODO: 'delete_todo',
  HANDLE_ALL: 'handle_all',
  DONE: 'done',
  TODO_CHECKED: 'todo_checked',
  DELETE_ALL: 'delete_all'
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    //dispatched add todo will process here
    case ACTION.ADD_TODO: {
      //return value from add todo
      return [...state, {
        id: action.id,
        todoValue: action.todoValue,
        status: false
      }]
    }

    case ACTION.EDIT_TODO: {
      return state.map((todo: { id: number, todoValue: string, status: boolean }) => {
        if (todo.id === action.todo.id) {
          return action.todo
        } else {
          return todo
        }
      })
    }
    //delete return
    case ACTION.DELETE_TODO: {
      return state.filter((todo: { id: number, todoValue: string, status: boolean }) =>
        todo.id !== action.id
      )
    }

    case ACTION.HANDLE_ALL: {
      return action.arr
    }
  

    case ACTION.DONE: {
      return 
    }

    case ACTION.TODO_CHECKED:
      return action.arr

    case ACTION.DELETE_ALL:
      return []
      
    default:
      return state
  }
}

var nextId = 2;
const initialValue = [
  { id: 0, todoValue: 'How to do it', status: false },
  { id: 1, todoValue: 'hehe', status: false }]