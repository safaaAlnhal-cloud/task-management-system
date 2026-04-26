import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useTask } from "./useTask";
import * as api from "../api/tasks";


vi.mock("../api/tasks", () => ({
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  deleteTask: vi.fn(),
  updateTaskStatus: vi.fn(),
  updateTask: vi.fn(),
  getTaskById: vi.fn(),
}));

describe("useTask hook", () => {

  it("should load task successfully", async () => {
    (api.getTaskById as any).mockResolvedValue({
      id: 1,
      title: "Test Task",
    });

    const { result } = renderHook(() => useTask(1));

    await waitFor(() => {
      expect(result.current.task).toEqual({
        id: 1,
        title: "Test Task",
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("");
    });
  });

  it("should handle error when API fails", async () => {
    (api.getTaskById as any).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useTask(1));

    await waitFor(() => {
      expect(result.current.task).toBe(null);
      expect(result.current.error).toBe("Failed to load task");
      expect(result.current.loading).toBe(false);
    });
  });

});