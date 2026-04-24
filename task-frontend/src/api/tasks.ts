import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`http://localhost:3000/tasks/${id}`);
};

export const createTask = async (data: {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}) => {
  const response = await axios.post("http://localhost:3000/tasks", data);
  return response.data;
};
