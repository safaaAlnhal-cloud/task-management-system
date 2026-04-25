import { useEffect, useState } from "react";
import { getTaskById } from "../api/tasks";
import  type { Task } from "../types/task.types";
export const useTask = (id: number) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);

        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        setError("Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTask();
    }
  }, [id]);

  return { task, loading, error };
};