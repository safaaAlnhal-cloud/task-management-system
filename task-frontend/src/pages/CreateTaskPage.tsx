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
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create Task</h1>

        <AddTaskForm onCreate={handleSubmit}/>
      </div>
    </div>
  );
};