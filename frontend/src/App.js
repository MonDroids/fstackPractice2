import { useEffect, useState } from "react";

function App(){
  const [users, setUsers] = useState([]);
  // Backend-с хэрэглэгчийн мэдээлэл авах
  useEffect(() => {
    fetch("http://localhost:3002/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
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