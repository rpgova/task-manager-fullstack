import { useState } from "react";

export default function TaskForm({ onSave, initialData = {}, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "To Do");
  const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave({
      ...initialData,
      title,
      description,
      status,
      assignedTo,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">{initialData?.id ? "Edit Task" : "Add New Task"}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input type="text" className="w-full border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea className="w-full border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select className="w-full border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Assigned To</label>
            <input type="text" className="w-full border p-2 rounded" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
          </div>
          <div className="flex justify-end space-x-2 mt-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">{initialData?.id ? "Update Task" : "Add Task"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
