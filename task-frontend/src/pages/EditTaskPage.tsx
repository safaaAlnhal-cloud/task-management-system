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
  const payload: any = {
    title,
  };

  if (description) payload.description = description;
  if (dueDate) payload.dueDate = dueDate;
if (priority) payload.priority = priority;
  await handleUpdateTask(Number(id), payload);

  navigate("/tasks");
};
return (
  <div className="p-10">
    <h1 className="text-xl font-bold mb-4">Edit Task</h1>

    <input
      className="border p-2 block mb-2"
      value={title ?? ""}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
    />

    <input
      className="border p-2 block mb-2"
      value={description ?? ""}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
    />
    <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="border p-2 mb-2"
/>
<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="border p-2 mb-2"
>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>

    <button
      onClick={handleSave}
      className="bg-green-500 text-white px-4 py-2"
    >
      Save
    </button>
  </div>
);

}