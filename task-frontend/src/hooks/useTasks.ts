import { useEffect, useState } from 'react';
import { fetchTasks,createTask,deleteTask, updateTaskStatus,updateTask } from '../api/tasks';
import type { Task, CreateTaskPayload } from "../types/task.types";
import { getErrorMessage } from "../utils/error";
export const useTasks = (params?: {
  search?: string;
  status?: string;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
  const loadTasks = async () => {
    try {
      setLoading(true);

      const offset = (page - 1) * limit;

     const res = await fetchTasks(
        params?.search,
        params?.status,
        limit,
       offset
      );

    setTasks(res.data);     
    setTotal(res.total);    
    } catch (err) {
    console.error("fetchTasks error:", err);
    setError(getErrorMessage(err, "Failed to fetch tasks"));
   } finally {
      setLoading(false);
    }
  };

  loadTasks();
}, [params?.search, params?.status, page]);


  const handleDelete = async (id: number) => {
  try {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }  catch (err) {
  console.error(err);
  setError(getErrorMessage(err, "Failed to delete task"));
}
};


const handleCreate = async (data:  CreateTaskPayload) => {
  try {
    const newTask = await createTask(data);

    setTasks((prev) => [newTask.data , ...prev]);
    return true;
  } catch (err) {
  console.error(err);
  setError(getErrorMessage(err, "Failed to create task"));
}
}; 

const handleUpdateStatus = async (id: number, status: string) => {
  try {
    const updatedTask = await updateTaskStatus(id, status);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? updatedTask.data : task
      )
    );
  } catch (err) {
  console.error(err);
  setError(getErrorMessage(err, "Failed to update status"));
}
};

const handleUpdateTask = async (id: number, data: CreateTaskPayload) => {
  try {
    const updated = await updateTask(id, data);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? updated.data : task
      )
    );

    return updated;
  } catch (err) {
    console.error(err);
  setError(getErrorMessage(err, "Failed to update task"));
}
};
   
  return { tasks, loading, error, handleDelete, handleCreate,handleUpdateStatus,handleUpdateTask,page,setPage,total,limit,};
};