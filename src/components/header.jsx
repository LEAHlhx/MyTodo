import React, { useRef } from "react"
import { createRef } from "react";

export function Header(props) {
    const showRef = useRef();
    const addTodo = useRef();
    const addTime = useRef();
    //设置add-form的显示隐藏
    function setAddForm() {
        let disp = showRef.current.style.display;
        showRef.current.style.display = disp === 'none' ? 'block' : 'none';
    }
    //根据输入框内容改变todos内容
    const handleInput = () => {

        if (addTodo.current.value !== '') {
            props.todos.push({ content: addTodo.current.value, type: props.currentBox })
            props.setsave();
            addTodo.current.value = ''
        } else if (addTodo.current.value === '') {
            alert("Please enter the content!");
        }
    }
    return (
        <>
            <div className="header">
                <h1>TODO LIST</h1>
                <button className="btn" onClick={setAddForm}>Arrange my day</button>
            </div >
            <form className="add-form" ref={showRef} style={{ display: 'none' }}>
                <div className="form-control">
                    <label htmlFor="add-task">Task</label>
                    <input id="add-task" type="text" placeholder="Add Task" ref={addTodo} />
                </div>
                <div className="form-control">
                    <label htmlFor="add-day&time">Day & Time</label>
                    <input id="add-day&time" type="text" placeholder="Add Day & Time" ref={addTime} />
                </div>
                <div className="form-control form-control-check">
                    <label htmlFor="reminder-btn">Set Reminder</label>
                    <input id="reminder-btn" type="checkbox" />
                </div>
                <input className="add-btn" type="submit" value="Save Task" onClick={handleInput} />
            </form>
        </>
    )
}