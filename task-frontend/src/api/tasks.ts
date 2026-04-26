import axios from "axios";
import type { CreateTaskPayload } from "../types/task.types";
const BASE_URL = import.meta.env.VITE_API_URL;

const API_URL = `${BASE_URL}/tasks`;

export const fetchTasks = (search?: string, status?: string) =>
  axios.get(API_URL, { params: { search, status } })
    .then(res => res.data.data);

export const getTaskById = (id: number) =>
  axios.get(`${API_URL}/${id}`)
    .then(res => res.data.data);

export const createTask = async (data: CreateTaskPayload) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data.data;
  } catch (error: any) {
    throw error; 
  }
};

export const updateTask = async (id: number, data: CreateTaskPayload) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}`, data);
    return res.data.data;
  } catch (error: any) {
    throw error; 
  }
};
export const deleteTask = (id: number) =>
  axios.delete(`${API_URL}/${id}`);

export const updateTaskStatus = async (id: number, status: string) => {
  const response = await axios.patch(
   `${API_URL}/${id}/status`,
    { status }
  );

  return response.data.data;
};