import { useState } from "react";
import { taskSchema } from "../validation/task.schema";

export const AddTaskForm = ({ onCreate }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const handleClick = async () => {
    if (!title.trim()) {
  setErrors({ title: "Title is required" });
  return;
}
  const result = taskSchema.safeParse({
  title,
  description: description || undefined,
  priority,
  dueDate: dueDate || undefined,
});

  // ❌ validation error
  if (!result.success) {
    const fieldErrors: any = {};

    result.error.issues.forEach((err) => {
      const field = err.path[0];
      fieldErrors[field] = err.message;
    });

    setErrors(fieldErrors);
    return; // 🚨 مهم جدًا: وقف التنفيذ
  }

  setErrors({});
  setLoading(true);

  try {
    await onCreate(result.data);

    // optional reset
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");

  } catch (err) {
    console.error("Create failed", err);
  } finally {
    setLoading(false); // ✔ دائمًا يرجع false
  }
};
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4">

      <input
         className={`w-full p-2 border rounded ${
          errors.title ? "border-red-500" : "border-gray-200"
        }`}
         placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
       {errors.title && (
        <p className="text-red-500 text-sm">{errors.title}</p>
      )}

      {/* DESCRIPTION */}
      <textarea
        className={`w-full p-2 border rounded ${
          errors.description ? "border-red-500" : "border-gray-200"
        }`}
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}

      {/* DATE */}
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* PRIORITY */}
      <select
        className="w-full p-2 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* BUTTON */}
      <button
        disabled={loading}
        onClick={handleClick}
        className={`py-2 rounded text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-900"
        }`}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </div>
  );
};