import { useEffect, useReducer, useState } from "react"
import AddTask from "../components/addtask"
import TodoList from "../components/todoList"

export default function Home() {

  const [todoState, dispatch] = useReducer(reducer, initialValue)
  const [todoClone, setTodoClone] = useState(todoState)


  console.log(todoState, 'todoState')
  console.log(todoClone, 'todoClone')
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
  }

  const handleDone = () => {
    const updated = todoState.filter((todo: { id: number, todoValue: string, status: boolean }, index: number) => todo.status)
    // set todostate filter to todoClone usestate
    setTodoClone(updated)

  }
  // filters state false status when pressing todo button, 
  const handleTodo = () => {
    const done = todoState.filter((todo: { id: number, todoValue: string, status: boolean }) => !todo.status)
    setTodoClone(done)

  }
  //Deletes Done Tasks
  const handleDeleteDone = () => {
    const done = todoState.filter((todo: { id: number, todoValue: string, status: boolean }) => !todo.status)

    dispatch({
      type: ACTION.DELETE_ALL_DONE,
      done: [...done]

    })
  }
  //Delete all
  const handleDeleteAll = () => {
    dispatch({
      type: ACTION.DELETE_ALL,
    })
  }

  useEffect(() => {
    if (todoState) setTodoClone(todoState)
  }, [todoState])

  return (
    <div className="bg-black h-screen w-full">
      <div className=' flex flex-row justify-center p-5'>
        <div className="bg-white flex flex-col rounded-lg ring-2 place-items-center w-1/2 h-full ">
          <AddTask
            handleAdd={handleAdd}
          />
          <TodoList
            todoState={todoClone}

            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAll={handleAll}
            handleDone={handleDone}
            dispatch={dispatch}
            handleDeleteAll={handleDeleteAll}
            handleTodo={handleTodo}
            handleDeleteDone={handleDeleteDone}
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
  TODO_CHECKED: 'todo_checked',
  DELETE_ALL: 'delete_all',
  DELETE_ALL_DONE: 'delete_all_done',
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
      return [...state]
    }

    case ACTION.TODO_CHECKED:
      return action.newList

    case ACTION.DELETE_ALL:
      return state = []

    case ACTION.DELETE_ALL_DONE:
      return action.done

    default:
      return state
  }
}

var nextId = 2;
const initialValue = [
  { id: 0, todoValue: 'How to do it', status: true },
  { id: 1, todoValue: 'hehe', status: false }]