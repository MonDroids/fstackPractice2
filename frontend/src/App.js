import { useEffect, useState } from "react";

function App(){
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Backend-с хэрэглэгчийн мэдээлэл авах
  useEffect(() => {
    fetch("http://localhost:3002/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Хэрэглэгч нэмэх
  const handleSubmit = (e) =>{
    e.preventDefault();
    const newUser = {name, email};
    fetch('http://localhost:3002/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        setName("");
        setEmail("");
      })
      .catch((error) => console.error("Error adding user:", error));
  };
  

  return (
    <div>
      <h1>Шинэ хэрэглэгч нэмэх</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="И-мэйл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Нэмэх</button>
      </form>

      
      <h1>Хэрэглэгчидийн мэдээллийг харах</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;