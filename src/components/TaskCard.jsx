export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-3 mb-3 border border-gray-200 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-500 mt-2">👤 {task.assignedTo || "Unassigned"}</p>
      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
