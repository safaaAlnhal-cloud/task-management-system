import { useState } from "react";

export const AddTaskForm = ({ onCreate, buttonClass }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleClick = async () => {
    await onCreate({
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
      priority,
    });
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4">

      <input
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button
        onClick={handleClick}
        className={buttonClass}
      >
        Create Task
      </button>

    </div>
  );
};