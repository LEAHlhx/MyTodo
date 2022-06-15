import React from "react"
import { Drag } from "./drag"

export function Todos(props) {
    //两个图标的绑定事件
    const handleDoneBtnClick = (index) => {
        props.changeTodos(index, 1)
    }
    const handleDelBtnClick = (index) => {
        props.changeTodos(index, 2)
    }

    return (
        <ul>
            <Drag render={props.todos.map((todo, index) => (props.currentBox === todo.type || props.currentBox === 0 || (props.currentBox === 2 && todo.type !== 1)) && <li className={`content ${todo.type === 1 ? 'done' : ""}`} key={index}>
                <span className="doneBtn" onClick={() => handleDoneBtnClick(index)} >{"✅"}</span>
                <span className="innerContent">{todo.content}</span>
                <span className="delBtn" onClick={() => handleDelBtnClick(index)} >{"❌"}</span>
            </li>)} setItems={props.setsave} items={props.todos}>
            </Drag>
        </ul>
    )
}