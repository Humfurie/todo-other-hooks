import { Key, useState } from "react"

const TodoList = (props: any) => {
    const {
        todoState,
        handleEdit,
        handleDelete
    } = props

    return (
        <ul>
            {todoState.map((todo: { id: number | Key | null | undefined, todoValue: string, status: boolean }, idx: number) =>
                <li key={todo.id}>
                    <TodoView
                        todo={todo}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </li>
            )
            }

        </ul>
    )
}

const TodoView = (props: any) => {
    const {
        todo,
        handleEdit,
        handleDelete,
    } = props

    console.log(todo.id)
    const [isEditing, setIsEditing] = useState(false)
    let todoContent;
    if (isEditing) {
        todoContent = (
            <>
                <input
                    type="text"
                    value={todo.todoValue}
                    onChange={e => {
                        handleEdit({
                            ...todo,
                            todoValue: e.target.value
                        })
                    }} />
                <button
                    onClick={() => {
                        setIsEditing(false)
                    }}>
                    save
                </button>
            </>
        )
    } else {
        todoContent = (
            <>
                {todo.todoValue}
                <button
                    onClick={() => {
                        setIsEditing(true)
                    }}>Edit</button>
            </>
        )
    }
    return (
        <div>
            <label htmlFor="">
                <input type="checkbox"
                    checked={todo.done}
                    onChange={e => {
                        handleEdit({
                            ...todo,
                            status: e.target.value
                        })
                    }} />
                {todoContent}
                <button
                    onClick={e => {
                        handleDelete(todo.id)
                    }}>Delete</button>
            </label>
        </div>
    )
}

export default TodoList