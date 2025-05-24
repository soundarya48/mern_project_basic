import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todo = () => {
    const [db, setDb] = useState([]);
    const [name, setName] = useState("demo");
    const [editId, setEditId] = useState(null);

    // CREATE
    const post = () => {
        axios.post("http://localhost:5000/posts", { name })
            .then(() => {
                alert("Post created");
                get();
                setName("");
            })
            .catch(() => {
                alert("Post creation failed");
            });
    };

    // READ
    const get = () => {
        axios.get('http://localhost:5000/posts')
            .then((res) => {
                setDb(res.data);
            })
            .catch(() => {
                alert("Data fetch failed");
            });
    };

    // UPDATE
    const put = () => {
        axios.put(`http://localhost:5000/posts/${editId}`, { name })
            .then(() => {
                alert("Post updated");
                get();
                setName("");
                setEditId(null);
            })
            .catch(() => {
                alert("Update failed");
            });
    };

    // DELETE
    const deletePost = (id) => {
        axios.delete(`http://localhost:5000/posts/${id}`)
            .then(() => {
                alert("Post deleted");
                get();
            })
            .catch(() => {
                alert("Delete failed");
            });
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <div style={{ margin: '100px' }}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
            />
            <button onClick={editId ? put : post}>
                {editId ? "Update" : "Post"}
            </button>

            <h3>Todo List:</h3>
            {db.map((item) => (
                <div key={item._id} style={{ marginBottom: "10px" }}>
                    {item.name}
                    <button onClick={() => {
                        setName(item.name);
                        setEditId(item._id);
                    }} style={{ marginLeft: '10px' }}>
                        Edit
                    </button>
                    <button onClick={() => deletePost(item._id)} style={{ marginLeft: '10px' }}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Todo;
