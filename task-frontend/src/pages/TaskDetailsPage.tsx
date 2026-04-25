import { useParams } from "react-router-dom";
import { useTask } from "../hooks/useTask";

export const TaskDetailsPage = () => {
  const { id } = useParams();

  const { task, loading, error } = useTask(Number(id));

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );

  if (!task)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Task not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-6">

        <h1 className="text-3xl font-bold text-gray-800">
          {task.title}
        </h1>

        <p className="text-lg text-gray-600">
          {task.description || "No description"}
        </p>

        {/* STATUS */}
        <div className="flex justify-between items-center text-base text-gray-700">
          <span className="font-medium">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              task.status === "done"
                ? "bg-green-100 text-green-700"
                : task.status === "in_progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {task.status}
          </span>
        </div>

        {/* PRIORITY */}
        <div className="flex justify-between items-center text-base text-gray-700">
          <span className="font-medium">Priority</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              task.priority === "high"
                ? "bg-red-100 text-red-700"
                : task.priority === "medium"
                ? "bg-gray-300 text-gray-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* DUE DATE */}
        <div className="flex justify-between items-center text-base text-gray-700">
          <span className="font-medium">Due Date</span>
          <span className="text-gray-800">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No date"}
          </span>
        </div>

      </div>
    </div>
  );
};