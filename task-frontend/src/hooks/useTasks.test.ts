import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useTasks } from "./useTasks";
import * as api from "../api/tasks";

vi.mock("../api/tasks");

const mockedApi = vi.mocked(api);

describe("useTasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load tasks", async () => {
    mockedApi.fetchTasks.mockResolvedValue({
      data: [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" }
      ],
      total: 2,
      limit: 5,
      offset: 0
    });

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(2);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should delete task", async () => {
    mockedApi.fetchTasks.mockResolvedValue({
      data: [{ id: 1, title: "Task 1" }],
      total: 1,
      limit: 5,
      offset: 0
    });

    mockedApi.deleteTask.mockResolvedValue({});

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(1);
    });

    await result.current.handleDelete(1);

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(0);
    });
  });

  it("should create task", async () => {
    mockedApi.fetchTasks.mockResolvedValue({
      data: [],
      total: 0,
      limit: 5,
      offset: 0
    });

    mockedApi.createTask.mockResolvedValue({
      data: { id: 1, title: "New Task" }
    });

    const { result } = renderHook(() => useTasks());

    await result.current.handleCreate({
      title: "New Task"
    } as any);

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(1);
    });
  });

  it("should update status", async () => {
    mockedApi.fetchTasks.mockResolvedValue({
      data: [{ id: 1, title: "Task 1", status: "todo" }],
      total: 1,
      limit: 5,
      offset: 0
    });

    mockedApi.updateTaskStatus.mockResolvedValue({
      data: { id: 1, title: "Task 1", status: "done" }
    });

    const { result } = renderHook(() => useTasks());

    await result.current.handleUpdateStatus(1, "done");

    await waitFor(() => {
      expect(result.current.tasks[0].status).toBe("done");
    });
  });
});