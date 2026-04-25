import axios from "axios";
import type { CreateTaskPayload } from "../types/task.types";

const API_URL = "http://localhost:3000/tasks";

export const fetchTasks = (search?: string, status?: string) =>
  axios.get(API_URL, { params: { search, status } })
    .then(res => res.data.data);

export const getTaskById = (id: number) =>
  axios.get(`${API_URL}/${id}`)
    .then(res => res.data.data);

export const createTask = (data: CreateTaskPayload) =>
  axios.post(API_URL, data)
    .then(res => res.data.data);

export const updateTask = (id: number, data: CreateTaskPayload) =>
  axios.patch(`${API_URL}/${id}`, data)
    .then(res => res.data.data);

export const deleteTask = (id: number) =>
  axios.delete(`${API_URL}/${id}`);

export const updateTaskStatus = async (id: number, status: string) => {
  const response = await axios.patch(
   `${API_URL}/${id}/status`,
    { status }
  );

  return response.data.data;
};