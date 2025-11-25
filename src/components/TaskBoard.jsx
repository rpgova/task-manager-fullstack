import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import Filters from "./Filters";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "https://task-manager-backend-4-qq02.onrender.com/api";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    assignedTo: "",
    sortOrder: "asc",
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      const tasksWithDefaults = res.data.map((t) => ({
        ...t,
        status: t.status?.trim() || "To Do",
        assignedTo: t.assignedTo?.trim() || "",
      }));
      setTasks(tasksWithDefaults);
    } catch (err) {
      console.error("❌ Failed to fetch tasks:", err.message);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (task) => {
    try {
      if (task.id) {
        await axios.put(`${API_BASE}/tasks/${task.id}`, task);
      } else {
        await axios.post(`${API_BASE}/tasks`, task);
      }
      await fetchTasks();
      setShowForm(false);
      setEditTask(null);
    } catch (err) {
      console.error("❌ Error saving task:", err.message);
      alert("Server se connection fail hua!");
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("Delete this task permanently?")) {
        await axios.delete(`${API_BASE}/tasks/${id}`);
        fetchTasks();
      }
    } catch (err) {
      console.error("❌ Error deleting task:", err.message);
    }
  };

  const handleFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTasks = (tasks || [])
    .filter((t) =>
      filters.status ? t.status.toLowerCase() === filters.status.toLowerCase() : true
    )
    .filter((t) =>
      filters.assignedTo ? (t.assignedTo || "").toLowerCase() === filters.assignedTo.toLowerCase() : true
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime() || 0;
      const dateB = new Date(b.createdAt).getTime() || 0;
      return filters.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="p-6">
      <button
        onClick={() => {
          setEditTask(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Task
      </button>

      {showForm && (
        <TaskForm
          initialData={editTask}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditTask(null);
          }}
        />
      )}

      <Filters tasks={tasks} onFilter={handleFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col}
            className="bg-gray-50 rounded-2xl shadow-inner p-4 min-h-[300px]"
          >
            <h2 className="text-xl font-bold mb-4">{col}</h2>
            {filteredTasks
              .filter((t) => (t.status || "To Do").toLowerCase() === col.toLowerCase())
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
