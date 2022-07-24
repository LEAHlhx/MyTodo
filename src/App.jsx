import React, { useEffect, useState } from "react"
import { Header } from './components/header'
import { Checkbox } from './components/checkbox'
import { Todos } from './components/todos'

function App() {
    //盒子
    const [items, setItems] = useState([{ count: 0, name: 'ALL' }, { count: 0, name: 'Done' }, { count: 0, name: "UNDone" }])
    //当前所在盒子
    const [currentBox, setCurrentBox] = useState(0)
    const [todos, setTodos] = useState([])
    //更改盒子的状态
    function changItems() {
        items[0].count = todos.length
        items[1].count = todos.filter(todo => todo.type === 1).length
        items[2].count = items[0].count - items[1].count
        setItems([...items])
    }
    //更改事件状态（后续绑定需要使用）
    function changeTodos(index, type) {
        if (type === 2) {
            todos.splice(index, 1)
        } else {
            todos[index].type = todos[index].type === 0 ? 1 : 0
        }
        setsave()
    }
    //设置todos并保存数据
    const setsave = () => {
        setTodos([...todos])
        saveData(todos);
    }
    //保存至本地
    const saveData = (data) => {
        localStorage.setItem("todos", JSON.stringify(data));
    }
    //获取数据并赋予todos
    const getData = () => {
        let data = localStorage.getItem("todos")
        if (data != null) {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        setTodos([...data]);
    }
    //挂载时从内存中获取数据，并赋予todos
    useEffect(() => {
        getData();
    }, [])
    //在挂载和todos改变的时候执行changeItems
    useEffect(() => {
        changItems();
    }, [todos])//eslint-disable-line

    return (
        <div className="todo-list">
            <Header todos={todos} setsave={setsave} currentBox={currentBox} />
            <Checkbox currentBox={currentBox} changeCurrentBox={setCurrentBox} items={items} />
            {/* <input type="text" onKeyPress={(e) => handleInput(e)} placeholder="Add Todo" /> */}
            <Todos todos={todos} currentBox={currentBox} changeTodos={changeTodos} setsave={setsave} />
        </div>
    )
}
export default App  