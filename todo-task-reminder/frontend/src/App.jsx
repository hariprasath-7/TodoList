import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");

      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        throw new Error("Could not load tasks.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError("Could not connect to the backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();

    if (!newTask.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add task.");
      }

      const task = await response.json();

      setTasks((currentTasks) => [task, ...currentTasks]);
      setNewTask("");
    } catch (error) {
      setError("Could not add the task.");
    }
  }

  async function toggleTask(task) {
    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not update task.");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        )
      );
    } catch (error) {
      setError("Could not update the task.");
    }
  }

  async function deleteTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete task.");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      setError("Could not delete the task.");
    }
  }

  async function editTask(task) {
    const newTitle = window.prompt("Edit task", task.title);

    if (!newTitle || !newTitle.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not edit task.");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        )
      );
    } catch (error) {
      setError("Could not edit the task.");
    }
  }

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <main className="app">
      <section className="todo-card">
        <div className="heading">
          <p className="tag">TODAY'S PLANNER</p>
          <h1>My tasks</h1>
          <p>Stay focused. Complete one task at a time.</p>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            maxLength="150"
          />
          <button type="submit">Add task</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="task-summary">
          <span>{pendingTasks.length} pending</span>
          <span>{completedTasks.length} completed</span>
        </div>

        {loading ? (
          <p className="empty-message">Loading your tasks...</p>
        ) : (
          <>
            <TaskSection
              title="To do"
              tasks={pendingTasks}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask}
              emptyText="No pending tasks. Nice work!"
            />

            <TaskSection
              title="Completed"
              tasks={completedTasks}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask}
              emptyText="Completed tasks will appear here."
            />
          </>
        )}
      </section>
    </main>
  );
}

function TaskSection({ title, tasks, onToggle, onEdit, onDelete, emptyText }) {
  return (
    <section className="task-section">
      <h2>{title}</h2>

      {tasks.length === 0 ? (
        <p className="empty-message">{emptyText}</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className={task.completed ? "task completed" : "task"} key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task)}
                />
                <span>{task.title}</span>
              </label>

              <div className="actions">
                <button className="edit-button" onClick={() => onEdit(task)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default App;