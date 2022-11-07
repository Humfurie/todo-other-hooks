import { useState } from "react"

const AddTask = (props:any) => {
    const{
        handleAdd
    } = props
    const [text, setText] = useState('')
    return (
        <>
        <input 
        type="text"
        value={text}
        onChange = {e => setText(e.target.value)} />
        
        <button
        onClick={() => {
            setText('')
            handleAdd(text)
        }}>Add</button>
        </>
    )
}
export default AddTask