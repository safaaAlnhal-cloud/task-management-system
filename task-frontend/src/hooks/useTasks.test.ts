import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useTasks } from "./useTasks";
import * as api from "../api/tasks";

vi.mock("../../api/tasks");
vi.mock("../api/tasks", () => ({
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  deleteTask: vi.fn(),
  updateTaskStatus: vi.fn(),
  updateTask: vi.fn(),
  getTaskById: vi.fn(),
}));

describe("useTasks hook", () => {

  it("should load tasks", async () => {
    (api.fetchTasks as any).mockResolvedValue([
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ]);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(2);
      expect(result.current.loading).toBe(false);
    });
  });

  
  it("should delete task", async () => {
    (api.fetchTasks as any).mockResolvedValue([
      { id: 1, title: "Task 1" },
    ]);

    (api.deleteTask as any).mockResolvedValue({});

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(1);
    });

    await act(async () => {
      await result.current.handleDelete(1);
    });

    expect(result.current.tasks.length).toBe(0);
  });


  it("should create task", async () => {
    (api.fetchTasks as any).mockResolvedValue([]);

    (api.createTask as any).mockResolvedValue({
      id: 1,
      title: "New Task",
    });

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.handleCreate({
        title: "New Task",
      } as any);
    });

    expect(result.current.tasks[0].title).toBe("New Task");
  });

  it("should update status", async () => {
    (api.fetchTasks as any).mockResolvedValue([
      { id: 1, title: "Task", status: "pending" },
    ]);

    (api.updateTaskStatus as any).mockResolvedValue({
      id: 1,
      status: "done",
    });

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.handleUpdateStatus(1, "done");
    });

    expect(result.current.tasks[0].status).toBe("done");
  });

});