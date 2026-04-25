import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export const TasksPage = () => {
  const navigate = useNavigate();
  const { tasks, loading, error, handleDelete, handleUpdateStatus } = useTasks();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-semibold bg-red-100 px-5 py-3 rounded-xl shadow">
          {error}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            📋 Tasks
          </h1>

          <button
            onClick={() => navigate("/create")}
            className="bg-gray-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            + New Task
          </button>
        </div>

        {/* TASK LIST */}
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
        />

      </div>
    </div>
  );
};