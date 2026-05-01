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

        const res = await getTaskById(id);
        setTask(res.data);
      } catch (err: unknown) {
         console.error(err);
        setError("Failed to load task");
    }
       finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTask();
    }
  }, [id]);

  return { task, loading, error };
};