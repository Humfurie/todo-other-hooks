import { useEffect, useReducer, useState } from "react"
import AddTask from "../components/addtask"
import TodoList from "../components/todoList"

export default function Home() {


  const ACTION = {
    ADD_TODO: 'add_todo',
    EDIT_TODO: 'change_todo',
    DELETE_TODO: 'delete_todo'
  }

  // type stateType = {
  //   todo: any[],

  // }

  // type actionType = {
  //   type: string,
  //   payload: string,
  // }
 


  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION.ADD_TODO: {
        return [...state, {
          id: action.id,
          todoValue: action.todoValue,
          status: false
        }]}

      case ACTION.EDIT_TODO:{
        return state.map((t: {id: number, todoValue: string, status: boolean}) => {
          if (t.id === action.todo.id ) {
            return action.todo
          } else {
            return t
          }
        })
      }

      case ACTION.DELETE_TODO: {
        return state.filter((todo: {id: number, todoValue: string, status:boolean}) => 
          todo.id !== action.id
        )}

      default:
        return state
    }
  }

  const [todoState, dispatch] = useReducer(reducer, initialValue)

 
  const handleAdd = (todo: any) => {
    dispatch({
      type: ACTION.ADD_TODO,
      id: nextId++,
      todoValue: todo,
    })

  }

  const handleEdit = (todo: any) => {
    dispatch({
      type: ACTION.EDIT_TODO,
      todoValue: todo
    })
  }

  const handleDelete = (idx: any) => {
    dispatch({
      type: ACTION.DELETE_TODO,
      id: idx
    })
  }
  console.log(todoState)
  return (
    <div className="bg-gray-700 w-full h-screen">
      <AddTask
        handleAdd={handleAdd}
      />
      <TodoList
        todoState={todoState}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>

  )

}

var nextId = 2;
const initialValue = [
  {id: 0 , todoValue: 'How to do it', status: false },
  {id: 1 , todoValue: 'hehe', status: false }]