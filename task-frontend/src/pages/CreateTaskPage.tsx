import { AddTaskForm } from "../components/AddTaskForm";
import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

export const CreateTaskPage = () => {
  const { handleCreate } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await handleCreate(data);
    navigate("/tasks");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-5">

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Create Task
        </h1>

        <AddTaskForm
          onCreate={handleSubmit}
          buttonClass="bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition"
        />

      </div>
    </div>
  );
};