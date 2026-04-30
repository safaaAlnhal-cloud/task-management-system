import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const TasksPage = () => {
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const { tasks, loading, error, handleDelete, handleUpdateStatus , page,setPage,total,limit} =
    useTasks({
      search,
      status: filter === "all" ? undefined : filter,
    });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        <div className="flex items-center justify-between">
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

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-5">

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setFilter("all");
                setSearch("");
                setInputSearch("");
              }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("todo")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "todo"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todo
            </button>

            <button
              onClick={() => setFilter("in_progress")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "in_progress"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              In Progress
            </button>

            <button
              onClick={() => setFilter("done")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "done"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Done
            </button>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search tasks..."
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(inputSearch);
                }
              }}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <button
              onClick={() => setSearch(inputSearch)}
              className="bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition"
            >
              Search
            </button>
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           
         {error && (
           <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
                {error}
           </div>
         )}
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onUpdateStatus={handleUpdateStatus}
          />

          <div className="flex justify-center gap-4 mt-6">

      <button
           onClick={() => setPage((p) => Math.max(p - 1, 1))}
           disabled={page === 1}
           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
         Prev
      </button>

      <span>
         Page {page} of {Math.ceil(total / limit)}
      </span>

      <button
       onClick={() => setPage((p) => p + 1)}
       disabled={page * limit >= total}
       className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
         Next
      </button>

     </div>
        </div>

      </div>
    </div>
  );
};