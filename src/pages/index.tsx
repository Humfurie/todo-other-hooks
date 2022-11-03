import { useReducer } from "react"
export default function Home() {

  
  const ACTION = {
    ADD_TODO: 'add_todo',
    CHANGE_TODO: 'change_todo'
  }
  
  type stateType = {
    todo: string[],
    userInput: string,
  }

  type actionType = {
    type: string,
    payload: string,
  }
  
  const initialValue:stateType = {
    todo: [],
    userInput: ''
  }

  const reducer = (state: stateType, action: actionType) => {
    console.log(state.userInput, "data")
    console.log(state.todo, "todo")
    switch (action.type){
      case ACTION.ADD_TODO:
        return { 
          ...state, 
          todo:[...state.todo, action.payload] }
      case ACTION.CHANGE_TODO:
        return {
          ...state, 
          userInput: action.payload }
      default:
        return state
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch({type: ACTION.ADD_TODO, payload: e.target.value})
  }

  const handleOnchange = (e: any) => {
    // console.log(state.todo)
    dispatch({type: ACTION.CHANGE_TODO, payload: e.target.value})
  }
 const [state, dispatch] = useReducer<(args: any, payload: any) => any >(reducer, initialValue )
  return (
    <div>
      <form>
        <input 
        type="text"
        name="userInput"
        onChange={(e) => {
          e.preventDefault()
          handleOnchange(e)
        }}/>
        <button
        onClick={(e) => {
          e.preventDefault()
          handleSubmit(e)  
        }}>
          submit
        </button>
      </form>
      <div>
        {state.todo}
        {state.userInput}
        </div>
    </div>
  )
}
