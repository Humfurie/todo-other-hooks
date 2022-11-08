import { useState } from "react"

const AddTask = (props: any) => {
    const {
        handleAdd
    } = props
    const [text, setText] = useState('')
    //first step is making an input
    return (
        <div className='flex flex-col justify-center max-h-80 py-5 '>
            <div className="flex py-5">
                <input
                    className='bg-teal-300 flex justify-center w-full placeholder-black-900 rounded-2xl p-2'
                    placeholder='Task...'
                    required
                    type="text"
                    value={text}
                    //make an onchange event to set Text useState
                    onChange={e => setText(e.target.value)} />
            </div>
            <div className="bg-green-400 flex justify-center w-full rounded-2xl p-2 text-xl ">
                <button
                //pass the useState text to handle add props
                    onClick={() => {
                        if (text) {
                            setText('')
                            handleAdd(text)
                        }
                    }}>Add Task</button>
            </div>
        </div>
    )
}
export default AddTask