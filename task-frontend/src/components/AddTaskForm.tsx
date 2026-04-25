import { useState } from "react";

export const AddTaskForm = ({ onCreate }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleClick = async () => {
    await onCreate({
      title,
      description: description || undefined,
      priority,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Create Task</h2>

      {/* Title */}
      <input
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Due Date */}
      <input
        type="date"
        className="w-full border p-3 rounded-lg"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Priority */}
      <select
        className="w-full border p-3 rounded-lg"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      {/* Button */}
      <button
        onClick={handleClick}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Create Task
      </button>
    </div>
  );
};