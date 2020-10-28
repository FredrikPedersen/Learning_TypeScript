import React from "react";

interface TodoListProps {
    items: {id: string, text: string}[];
}

const TodoList: React.FC<TodoListProps> = (props) => {

    return <ul>
        <li>
            {props.items.map(todo => <li key={todo.id}>{todo.text}</li>)}
        </li>
    </ul>
};

export default TodoList