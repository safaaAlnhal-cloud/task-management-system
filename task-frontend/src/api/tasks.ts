import axios from "axios";
import type { CreateTaskPayload } from "../types/task.types";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/tasks`;

export const fetchTasks = async (
  search?: string,
  status?: string,
  limit: number = 5,
  offset: number = 0
) => {
  const res = await axios.get(API_URL, {
    params: { search, status, limit, offset },
  });

  return res.data; 
};

export const getTaskById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};


export const createTask = async (data: CreateTaskPayload) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateTask = async (id: number, data: CreateTaskPayload) => {
  const res = await axios.patch(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const updateTaskStatus = async (id: number, status: string) => {
  const res = await axios.patch(`${API_URL}/${id}/status`, { status });
  return res.data;
};