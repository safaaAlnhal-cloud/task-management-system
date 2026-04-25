import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById } from "../api/tasks";
import { useTasks } from "../hooks/useTasks";

export const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState<any>(null);
  const { handleUpdateTask } = useTasks();
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    const load = async () => {
      const data = await getTaskById(Number(id));
      setTask(data);
      setTitle(data.title);
      setDescription(data.description || "");
      setDueDate(data.dueDate || "");
      setPriority(data.priority || "medium");
    };
    load();
  }, [id]);

  const handleSave = async () => {
    const payload: any = { title };

    if (description) payload.description = description;
    if (dueDate) payload.dueDate = dueDate;
    if (priority) payload.priority = priority;

    await handleUpdateTask(Number(id), payload);
    navigate("/tasks");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4">

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Edit Task
        </h1>

        <input
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        <textarea
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button
          onClick={handleSave}
          className="bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
};