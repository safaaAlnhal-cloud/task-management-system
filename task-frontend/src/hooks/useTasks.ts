import { useEffect, useState } from 'react';
import { fetchTasks,createTask,deleteTask, updateTaskStatus,updateTask } from '../api/tasks';
import type { Task, CreateTaskPayload } from "../types/task.types";

export const useTasks = (params?: {
  search?: string;
  status?: string;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await fetchTasks(params?.search, params?.status);

      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  loadTasks();
}, [params?.search , params?.status]);


  const handleDelete = async (id: number) => {
  try {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  } catch (err) {
    console.error("Delete failed");
  }
};


const handleCreate = async (data:  CreateTaskPayload) => {
  try {
    const newTask = await createTask(data);

    setTasks((prev) => [newTask, ...prev]);
    return true;
  } catch (err) {
    return false;
  }
}; 

const handleUpdateStatus = async (id: number, status: string) => {
  try {
    const updatedTask = await updateTaskStatus(id, status);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? updatedTask : task
      )
    );
  } catch (err) {
    console.error("Update status failed");
  }
};

const handleUpdateTask = async (id: number, data: CreateTaskPayload) => {
  const updated = await updateTask(id, data);

  setTasks((prev) =>
    prev.map((task) =>
      task.id === id ? updated : task
    )
  );
};
   
  return { tasks, loading, error, handleDelete, handleCreate,handleUpdateStatus,handleUpdateTask};
};