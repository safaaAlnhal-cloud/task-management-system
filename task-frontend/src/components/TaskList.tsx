type Task = {
  id: number;
  title: string;
  status: string;
};

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
};

export const TaskList = ({ tasks, onDelete }: Props) => {
  return (
    <div className="grid gap-6 p-6 bg-gray-100 min-h-screen">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-5 rounded-2xl shadow-md bg-white flex justify-between items-center hover:shadow-lg transition duration-300 border border-gray-200"
        >
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg text-gray-800">
              {task.title}
            </h2>

            <span
              className={`mt-2 w-fit px-3 py-1 rounded-full text-sm font-medium ${
                task.status === "done"
                  ? "bg-green-100 text-green-600"
                  : task.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {task.status}
            </span>
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition duration-200"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};