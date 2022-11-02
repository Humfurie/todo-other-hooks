import { stringify } from "querystring"
import { useReducer } from "react"
export default function Home() {

  const ACTION ={
    ADD_TODO: "add_todo"
  }
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION.ADD_TODO:
        return { ...state, userInput: action.payload}

    }
  }
  const initialState = {
    userInput: {name: '', status: false, show: false},
    todoList: [{name: '', status: false, show: false}],
    cloneTodoList: []
  }
  const [state, dispatch] = useReducer<any>(reducer, initialState)
  return (
    <div>

        <input type="text" onChange={(e) => {
          dispatch({ type: ACTION.ADD_TODO , payload: e.target.value })
        }} />

    </div>
  )
}
