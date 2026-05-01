import { useState } from "react";
import { taskSchema } from "../validation/task.schema";
import { useNavigate } from "react-router-dom";

export const AddTaskForm = ({ onCreate }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

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

    if (!result.success) {
      const fieldErrors: any = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await onCreate(result.data);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");

    } catch (err) {
      console.error("Create failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); 
        handleClick();    
      }}
      className="w-full bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4"
    >

      {/* TITLE */}
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

      {/* BUTTONS */}
   

        {/* SUBMIT (Enter + Click) */}
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 py-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>

        {/* CANCEL */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

   

    </form>
  );
};