import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000";

  // LOGIN
  const login = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setToken(data.token);
  };

  // GET TASKS
  const getTasks = async () => {
    const res = await fetch(`${API}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  // CREATE TASK
  const createTask = async () => {
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    getTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getTasks();
  };

  // TOGGLE
  const toggleTask = async (id) => {
    await fetch(`${API}/tasks/${id}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getTasks();
  };

  useEffect(() => {
    if (token) getTasks();
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>

      {!token ? (
        <>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <input
            placeholder="New Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createTask}>Add</button>

          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                {t.title} [{t.completed ? "yes" : "no"}]
                <button onClick={() => toggleTask(t.id)}>Toggle</button>
                <button onClick={() => deleteTask(t.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;