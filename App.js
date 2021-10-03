import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";


export default function App() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("https://614ca9763c438c00179faae8.mockapi.io/mybook", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data1) => setUsers(data1));
  };

  const addUser = () => {
    fetch("https://614ca9763c438c00179faae8.mockapi.io/mybook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        pic: pic
      })
    }).then(() => getUsers());
  };

  return (
    <div className="App">
      <div className="h">
        {" "}
        <h1>Welcome to CRUD Page</h1>
      </div>
      <div className="user-input">
        <input
          value={name}
          placeholder="Enter your name"
          onChange={(event) => setName(event.target.value)}
        />

        <input
          value={pic}
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter your pic url"
        />

        <button className="add" onClick={addUser}>
          Add user 📥{" "}
        </button>
      </div>
      {users.map((plan) => (
        <User
          key={plan.id}
          username={plan.name}
          userpic={plan.pic}
          userid={plan.id}
          getUsers={getUsers}
        />
      ))}
      ;
    </div>
  );
}

function User({ username, userpic, userid, getUsers }) {
  const deleteUsers = () => {
    fetch("https://614ca9763c438c00179faae8.mockapi.io/mybook/" + userid, {
      method: "DELETE"
    }).then(() => getUsers());
  };

  const [edit, setEdit] = useState(false);
  return (
    <div>
      <div className="user-container">
        <img className="user-img" height="100" src={userpic} alt={username} />
        <div>
          <h1 className="user-name"> {username} </h1>
          <button className="delete " onClick={deleteUsers}>
            Delete ✂️
          </button>
          <button className="edit" onClick={() => setEdit(!edit)}>
            {edit ? "Cancel ❌ " : "Edit 🔧"}
          </button>
        </div>
      </div>
      {edit ? (
        <EditUser
          username={username}
          userpic={userpic}
          userid={userid}
          getUsers={getUsers}
          setEdit={setEdit}
        />
      ) : (
        ""
      )}
    </div>
  );
}
function EditUser({ username, userpic, userid, getUsers, setEdit }) {
  const [name, setName] = useState(username);
  const [pic, setPic] = useState(userpic);

  const editUser = () => {
    setEdit(false);
    fetch("https://614ca9763c438c00179faae8.mockapi.io/mybook/" + userid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        pic: pic
      })
    }).then(() => getUsers());
  };

  return (
    <div className="user-edit">
      <input className="name"
        value={name}
        placeholder="Enter your name"
        onChange={(event) => setName(event.target.value)}
      />

      <input className="name"
        value={pic}
        onChange={(event) => setPic(event.target.value)}
        placeholder="Enter your pic url"
      />

      <button className="add" onClick={editUser}>
        Save 💾
      </button>
    </div>
  );
}
