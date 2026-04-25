import { useNavigate } from "react-router-dom";
type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: "todo" | "in_progress" | "done";
  isOverdue?: boolean;
  isHighPriority?: boolean;
  isCompletedOnTime?: boolean;
};

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, status: string) => void

};

export const TaskList = ({ tasks, onDelete, onUpdateStatus }: Props) => {
  const statusStyle = {
    todo: "bg-gray-100 text-gray-600",
    in_progress: "bg-blue-100 text-blue-600",
    done: "bg-green-100 text-green-600",
  };
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 p-6 max-w-2xl mx-auto">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`rounded-xl border p-4 flex flex-col gap-3 hover:shadow-md transition
          ${
            task.isOverdue
              ? "bg-red-50 border-red-300"
              : task.status === "done"
              ? "bg-green-50 border-green-300"
              : "bg-white border-gray-200"
          }`}
        >
          
          <div className="flex justify-between items-center">
            <h2
              className={`font-semibold text-gray-800 ${
                task.status === "done" ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h2>

            <span
              className={`text-xs px-2 py-1 rounded-full font-medium
              ${statusStyle[task.status]}`}
            >
              {task.status}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex justify-between items-center text-xs text-gray-400">
            <div className="flex gap-2">
              {task.isHighPriority && (
                <span className="text-red-500 font-medium">
                  ⚠ High
                </span>
              )}

              {task.isOverdue && (
                <span className="text-red-400">
                  Overdue
                </span>
              )}
            </div>

            {task.dueDate && (
              <span>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <button
              onClick={() => onUpdateStatus(task.id, "in_progress")}
              className="text-xs px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Start
            </button>

            <button
              onClick={() => onUpdateStatus(task.id, "done")}
              className="text-xs px-3 py-1 rounded-md bg-green-100 text-green-600 hover:bg-green-200"
            >
              Done
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="text-xs px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
            >
              Delete
            </button>

            <button
            onClick={() => navigate(`/edit/${task.id}`)}
            className="text-blue-500 text-xs"
             >
                Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};