import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import Filters from "./Filters";

// ✅ Use deployed backend URL as fallback
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://task-manager-backend-isg7.onrender.com/api";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    assignedTo: "",
    sortOrder: "asc",
  });

  // ✅ Fetch tasks from backend safely
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else if (res.data.tasks && Array.isArray(res.data.tasks)) {
        setTasks(res.data.tasks);
      } else {
        console.error("Unexpected response:", res.data);
        setTasks([]);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Handle save (create/update)
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
      console.error("Error saving task:", err);
    }
  };

  // ✅ Edit existing task
  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  // ✅ Delete task
  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this task?")) {
        await axios.delete(`${API_BASE}/tasks/${id}`);
        fetchTasks();
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Filter changes
  const handleFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Apply filters + sorting safely
  const filteredTasks = (Array.isArray(tasks) ? tasks : [])
    .filter((t) => (filters.status ? t.status === filters.status : true))
    .filter((t) => (filters.assignedTo ? t.assignedTo === filters.assignedTo : true))
    .sort((a, b) =>
      filters.sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

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
            {(filteredTasks || [])
              .filter((t) => t.status === col)
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
