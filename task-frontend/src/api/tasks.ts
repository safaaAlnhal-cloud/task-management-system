import axios from 'axios';

export type CreateTaskPayload = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
};


const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`http://localhost:3000/tasks/${id}`);
};

export const createTask = async (data: CreateTaskPayload) => {
  const response = await axios.post("http://localhost:3000/tasks", data);
  return response.data.data;
};

export const updateTaskStatus = async (id: number, status: string) => {
  const response = await axios.patch(
    `http://localhost:3000/tasks/${id}/status`,
    { status }
  );

  return response.data.data;
};

export const getTaskById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};

export const updateTask = async (id: number, data: any) => {
  const res = await axios.patch(`http://localhost:3000/tasks/${id}`, data);
  return res.data.data;
};
