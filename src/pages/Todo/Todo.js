import { useForm } from "react-hook-form";
import React, { useEffect, useState, useRef } from 'react';
import '../../css/Todo.css';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';

export default function Todo() {
    const { register, watch, formState: { errors }, handleSubmit, getValues } = useForm();

    const [todoList, setTodoList] = useState([]);
    const refTodoItem = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/toDo_list');
                const todos = response.data;

                setTodoList(todos);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleTodoAdd = async (item) => {
        try {
            const response = await axios.post('http://localhost:8080/api/toDoList', {
                memo: item,
                completed: "false",
            });

            const newTodo = response.data;

            setTodoList((prevTodos) => [...prevTodos, { ...newTodo, memo: item }]);
            refTodoItem.current.value = '';
        } catch (error) {
            console.error(error);
        }
    };

    const handleTodoCheck = async (id, tf, memo) => {
        try {
            await axios.put(`http://localhost:8080/api/toDoList/edit/${id}`, {
                memo: memo,
                completed: tf === "true" ? "false" : "true",
            });

            setTodoList((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, completed: tf === "true" ? "false" : "true" } : todo
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleTodoDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/toDoList/delete/${id}`);

            setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page">
            <div className="container1">
                <div className="title">To Do List</div>
            </div>

            <div className="container2">
                <div className="todoAdd">
                    <input
                        type="text"
                        placeholder='할 일을 입력하세요'
                        ref={refTodoItem}
                    />
                    <button
                        style={{ marginLeft: '15px' }}
                        className='addButton'
                        onClick={() => handleTodoAdd(refTodoItem.current.value)}>
                        <div className="plus">+</div>
                    </button>
                </div>

                <div className="list">
                    {todoList.map((val) => (
                        <div className="todoItem" key={val.id}>
                            <div className="checkBox" onClick={() => handleTodoCheck(val.id, val.completed, val.memo)}>
                                <div className="checkIcon">
                                    {val.completed === "true" ? '✔' : ''}
                                </div>
                                <span>{val.memo}</span>
                            </div>
                            <div className="deleteBox" onClick={() => handleTodoDelete(val.id)}>
                                <FaTrash />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
