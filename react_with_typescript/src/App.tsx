import React, { useState } from 'react';
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import {Todo} from "./components/todo.model";

function App() {

    const [todos, setTodos] = useState<Todo[]>([]);

    const todoAddHandler = (text: string) => {
        setTodos(prevTodos => [...prevTodos, {id: Math.random().toString(), text: text}])
    };

    const todoDeleteHanlder =(todoId: string) => {
        setTodos(prevTodos => {
            return prevTodos.filter(todo => todo.id !== todoId);
        });
    };

    return (
        <div className="App">
            <NewTodo onAddTodo={todoAddHandler}/>
            <TodoList items={todos} onDeleteTodo={todoDeleteHanlder}/>
        </div>
    );
}

export default App;
