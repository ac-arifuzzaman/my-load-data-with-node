import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:1000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleLoading = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }
    // sent datta to the server 
    fetch('http://localhost:1000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers)
      });


    nameRef.current.value = '';
    emailRef.current.value = '';

    e.preventDefault()
  };
  return (
    <div className="App">
      <h2>Found users: {users.length}</h2>

      <form onSubmit={handleLoading}>
        <input ref={nameRef} type="text" name="" id="" placeholder="Your name" />
        <input ref={emailRef} type="email" name="" id="" placeholder="email" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {users.map(user => <li key={user.id}>{user.id}: {user.name} {user.email}</li>)}
      </ul>
    </div>
  );
}

export default App;
