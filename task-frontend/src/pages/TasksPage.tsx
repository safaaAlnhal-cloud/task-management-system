import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/TaskList";
import { AddTaskForm } from "../components/AddTaskForm";

export const TasksPage = () => {
  const { tasks, loading, error, handleDelete ,handleCreate } = useTasks();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-semibold bg-red-100 px-4 py-2 rounded-lg shadow">
          {error}
        </p>
      </div>
    );

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          📋 Tasks
        </h1>
        <AddTaskForm onCreate={handleCreate} />

        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>
    </div>
  );
};