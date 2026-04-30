import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useTask } from "../hooks/useTask";
import { taskSchema } from "../validation/task.schema";
import { getErrorMessage } from "../utils/error";

export const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [errors, setErrors] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const { task } = useTask(Number(id));
  const { handleUpdateTask } = useTasks();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setPriority(task.priority || "medium");
    }
  }, [task]);

  const handleSave = async () => {
    setSaving(true);
    setErrors({});

    try {
      if (!title.trim()) {
        setErrors({ title: "Title is required" });
        setSaving(false);
        return;
      }

      const result = taskSchema.safeParse({
        title,
        description,
        priority,
        dueDate,
      });

      if (!result.success) {
        const fieldErrors: any = {};

        result.error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });

        setErrors(fieldErrors);
        setSaving(false);
        return;
      }

      await handleUpdateTask(Number(id), {
        ...result.data,
        dueDate: dueDate || undefined,
      });

      navigate("/tasks");

    } catch (err) {
      setErrors({
          general: getErrorMessage(err, "Something went wrong"),
        });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); 
        handleSave();     
      }}
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4">

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Edit Task
        </h1>

        {/* TITLE */}
        <input
          className={`w-full p-2 border rounded ${
            errors.title ? "border-red-500" : "border-gray-200"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title}</p>
        )}

        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {/* DATE */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {/* PRIORITY */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {/* GENERAL ERROR */}
        {errors.general && (
          <p className="text-red-500 text-sm text-center">
            {errors.general}
          </p>
        )}

        {/* BUTTONS */}
        <button
          type="submit"
          disabled={saving}
          className={`py-2 rounded text-white ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="py-2 rounded border"
        >
          Cancel
        </button>

      </div>
    </form>
  );
};