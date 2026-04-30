import axios from "axios";
import { describe, it, expect, vi } from "vitest";

import {
  fetchTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
 
} from "./tasks";

vi.mock("axios");

describe("Tasks API", () => {

  it("fetchTasks returns data", async () => {
    (axios.get as any).mockResolvedValue({
      data: { data: [{ id: 1, title: "Task" }] },
    });

    const result = await fetchTasks();

    expect(result).toEqual([{ id: 1, title: "Task" }]);
  });

  it("getTaskById returns task", async () => {
    (axios.get as any).mockResolvedValue({
      data: { data: { id: 1, title: "Task" } },
    });

    const result = await getTaskById(1);

    expect(result.id).toBe(1);
  });

  it("createTask returns created task", async () => {
    (axios.post as any).mockResolvedValue({
      data: { data: { id: 1, title: "New Task" } },
    });

    const result = await createTask({ title: "New Task" } as any);

    expect(result.title).toBe("New Task");
  });

  it("updateTask returns updated task", async () => {
    (axios.patch as any).mockResolvedValue({
      data: { data: { id: 1, title: "Updated" } },
    });

    const result = await updateTask(1, { title: "Updated" } as any);

    expect(result.title).toBe("Updated");
  });

  it("deleteTask works", async () => {
    (axios.delete as any).mockResolvedValue({ data: {} });

    const result = await deleteTask(1);

    expect(result).toBeDefined();
  });

});