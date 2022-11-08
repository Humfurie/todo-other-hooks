import { Key, useState } from "react"

const TodoList = (props: any) => {
    const {
        todoState,
        handleEdit,
        handleDelete,
        handleAll,
        handleDone,
        dispatch,
        handleDeleteAll
    } = props

    const [list, setList] = useState([])

    return (
        <div className="flex flex-col w-full justify-center">
            <div className="flex justify-evenly w-full py-2">
                <button
                    name='all_button'
                    className="bg-green-400 flex justify-center rounded-2xl p-2 pl-2 pr-2 text-xl"
                    onClick={e => {
                        handleAll()
                    }}
                >All</button>
                <button
                    name="done_button"
                    className="bg-green-400 flex justify-center rounded-2xl p-2 pl-2 pr-2 text-xl"
                    onClick={e => {
                        handleDone()
                    }}
                >Done</button>
                <button
                    className="bg-green-400 flex justify-center rounded-2xl p-2 pl-2 pr-2 text-xl">Todo</button>
            </div>
            <div className="flex flex-col">
                <ul>
                    {todoState.map((todo: { id: Key | null | undefined | number, todoValue: string, status: boolean }) => (<>
                        {console.log(todo)}
                        <div key={todo.id}>
                            <TodoView
                                todoState={todoState}
                                todo={todo}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                dispatch={dispatch}
                            />
                        </div>
                    </>)
                    )
                    }

                </ul>
            </div>
            <div className="flex justify-evenly w-full py-2">
                <button
                    className="bg-red-400 flex justify-center rounded-2xl p-2 pl-2 pr-2 text-xl">Delete Done Task</button>
                <button
                    onClick={e => {
                        handleDeleteAll()
                    }}
                    className="bg-red-400 flex justify-center rounded-2xl p-2 pl-2 pr-2 text-xl">Delete All Task</button>
            </div>
        </div>
    )
}

const TodoView = (props: any) => {
    const {
        todo,
        handleEdit,
        handleDelete,
        todoState,
        dispatch,
    } = props


    const [isEditing, setIsEditing] = useState(false)
    let todoContent;
    if (isEditing) {
        todoContent = (
            <div className="flex justify-evenly w-full">
                <div>
                    <input className="enabled:hover:border-gray-400"
                        type="text"
                        value={todo.todoValue}
                        onChange={e => {
                            handleEdit({
                                ...todo,
                                todoValue: e.target.value
                            })

                        }} />
                </div>
                <div className="flex flex-row">
                    <input type="checkbox"
                        checked={todo.done} />
                    <button
                        className="bg-green-400 flex justify-center rounded-sm pr-2 pl-2 "
                        onClick={() => {
                            setIsEditing(false)
                        }}>
                        save
                    </button>
                </div>
            </div>
        )
    } else {
        todoContent = (
            <div className="flex justify-evenly w-full">
                <div>
                    {todo.todoValue}
                </div>
                <div className="">
                    <input type="checkbox"
                        // checked={todo.status}
                        onChange={e => {
                            const newTodo = todoState.find((_: { id: number, todoValue: string, status: boolean, }, index: number) => index === todo.id)
  
                            const newList = todoState
                            newList[todo.id] = {id: newTodo.id, todoValue:newTodo.todoValue, status: e.target.checked}

                            dispatch({
                                type: 'todo_checked',
                                arr: newList
                            })

                        }}/>
                    <button
                        onClick={() => {
                            setIsEditing(true)
                        }}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg></button>
                    <button
                        name="delete"
                        onClick={e => {
                            handleDelete(todo.id)
                        }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg></button>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-row w-full">
            {todoContent}
        </div>
    )
}

export default TodoList