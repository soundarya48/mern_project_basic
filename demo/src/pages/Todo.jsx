import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Todo = () => {
    const [todo, setTodo] = useState("");
    const [db, setDb] = useState([])
    function post() {
        axios.post("http://localhost:5000/api/post", { todo })
            .then(() => {
                alert("data has been stored")
                get();
                setTodo("")
            })
            .catch((err) => {
                console.error(err);

            })
    }
    function get() {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                setDb(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }
    console.log(db);

    function update(data, id) {
        axios.put(`http://localhost:3000/posts/${id}`, { todo: data })
            .then(() => {
                get();
            })
            .catch((err) => {
                console.error(err);

            })
    }

    function del(id) {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                get();
            })
            .catch((err) => {
                console.error(err);
            })

    }


    return (
        <div style={{ margin: '100px' }}>
            <label htmlFor="todo">Todo</label>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button onClick={post}>Post</button>
            <ul>
                {
                    db.map((it) => (
                        <li key={it.id}>{it.todo}<button onClick={() => {
                            const data = prompt("enter the data").trim();
                            update(data, it.id)
                        }}>up</button>            <button onClick={() => del(it.id)}>del</button>    </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Todo