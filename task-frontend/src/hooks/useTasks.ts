import { useEffect, useState } from 'react';
import { fetchTasks } from '../api/tasks';
import { deleteTask } from "../api/tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
  try {
    await deleteTask(id);

    setTasks((prev) => prev.filter((task) => task.id !== id));
  } catch (err) {
    console.error("Delete failed");
  }
};

  return { tasks, loading, error, handleDelete};
};