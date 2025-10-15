export default function Filters({ tasks, onFilter }) {
  const uniqueUsers = [...new Set(tasks.map(t=>t.assignedTo).filter(Boolean))];
  const handleChange = (e)=>{ const {name,value}=e.target; onFilter(name,value); };
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <div>
        <label className="text-sm font-medium mr-2">Status:</label>
        <select name="status" onChange={handleChange} className="border rounded p-1">
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mr-2">Assigned To:</label>
        <select name="assignedTo" onChange={handleChange} className="border rounded p-1">
          <option value="">All</option>
          {uniqueUsers.map(user=><option key={user} value={user}>{user}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mr-2">Sort By Date:</label>
        <select name="sortOrder" onChange={handleChange} className="border rounded p-1">
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>
      </div>
    </div>
  );
}
