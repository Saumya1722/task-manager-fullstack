import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);
const [projectName, setProjectName] = useState("");
const [selectedProject, setSelectedProject] = useState("");
const [dashboard, setDashboard] = useState(null);


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

  const getProjects = async () => {

  const res = await fetch(
    "http://localhost:5000/projects",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await res.json();

  setProjects(data);
};

const getDashboard = async (projectId) => {

  const res = await fetch(
    `${API}/projects/${projectId}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await res.json();

  setDashboard(data);
};


  // CREATE TASK
  const createTask = async () => {
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    body: JSON.stringify({
  title,
  projectId: Number(selectedProject)
}),
    });

    setTitle("");
    getTasks();
  };


 const createProject = async () => {

  const res = await fetch(
    "http://localhost:5000/projects",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: projectName
      })
    }
  );

  await res.json();

  setProjectName("");

  getProjects();
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

  if (token) {

    getTasks();

    getProjects();

  }

}, [token]);

  return (
   <div
  style={{
    padding: "30px",
    fontFamily: "Arial",
    maxWidth: "700px",
    margin: "auto"
  }}
>
      <h2>Task Manager</h2>
      {token && (
  <button 
  style={{
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer"
  }}
  onClick={() => setToken("")}>
    Logout
  </button>
)}

      {!token ? (
        <>
          <input
             style={{
    padding: "8px",
    marginRight: "10px",
    marginBottom: "10px"
  }}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{
    padding: "8px",
    marginRight: "10px",
    marginBottom: "10px"
  }}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
          style={{
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer"
  }}
          onClick={login}>Login</button>
        </>
      ) : (
        <>
        <h3>Projects</h3>

<input
  style={{
    padding: "8px",
    marginRight: "10px",
    marginBottom: "10px"
  }}
  placeholder="Project Name"
  value={projectName}
  onChange={(e) => setProjectName(e.target.value)}
/>

<button 
style={{
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer"
  }}
onClick={createProject}>
  Create Project
</button>

<ul>
  {projects.map((p) => (
    <li key={p.id}>
      {p.name}
    </li>
  ))}
</ul>
<select
  value={selectedProject}
  onChange={(e) => {

    setSelectedProject(e.target.value);

    getDashboard(e.target.value);

  }}
>

  <option value="">
    Select Project
  </option>

  {projects.map((p) => (
    <option key={p.id} value={p.id}>
      {p.name}
    </option>
  ))}

</select>
          <input
            style={{
    padding: "8px",
    marginRight: "10px",
    marginBottom: "10px"
  }}
            placeholder="New Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
          style={{
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer"
  }}
           onClick={createTask}>Add</button>

          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                {t.title} [{t.completed ? "yes" : "no"}]
                <button 
                style={{
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer"
  }}
                onClick={() => toggleTask(t.id)}>Toggle</button>
                <button 
                style={{
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer"
  }}
                onClick={() => deleteTask(t.id)}>Delete</button>
              </li>
            ))}
          </ul>

          {dashboard && (

  <div>

    <h3>Dashboard</h3>

    <p>Total Tasks: {dashboard.totalTasks}</p>

    <p>Completed Tasks: {dashboard.completedTasks}</p>

    <p>Pending Tasks: {dashboard.pendingTasks}</p>

  </div>

)}


        </>
      )}
    </div>
  );
}

export default App;