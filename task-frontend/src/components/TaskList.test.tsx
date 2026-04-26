import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskList } from "./TaskList";
import { MemoryRouter } from "react-router-dom";
import type { Task } from "../types/task.types";

const createMockTask = (overrides: Partial<Task> = {}): Task => ({
  id: 1,
  title: "Test Task",
  status: "todo", 
  priority: "low",
  description: "",
  isOverdue: false,
  isHighPriority: false,
  isCompletedOnTime: false,
  dueDate: "",
  ...overrides,
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("TaskList Component", () => {

  it("renders tasks", () => {
    const tasks = [
      createMockTask({ id: 1, title: "Task 1" }),
      createMockTask({ id: 2, title: "Task 2", status: "done" }),
    ];

    render(
      <MemoryRouter>
        <TaskList
          tasks={tasks}
          onDelete={vi.fn()}
          onUpdateStatus={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("shows empty state when no tasks", () => {
    render(
      <MemoryRouter>
        <TaskList
          tasks={[]}
          onDelete={vi.fn()}
          onUpdateStatus={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("No tasks found")).toBeInTheDocument();
  });

  it("calls onDelete when clicking delete", () => {
    const onDelete = vi.fn();

    render(
      <MemoryRouter>
        <TaskList
          tasks={[createMockTask({ id: 1, title: "Task" })]}
          onDelete={onDelete}
          onUpdateStatus={vi.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onUpdateStatus when clicking Done", () => {
    const onUpdateStatus = vi.fn();

    render(
      <MemoryRouter>
        <TaskList
          tasks={[createMockTask({ id: 1, title: "Task" })]}
          onDelete={vi.fn()}
          onUpdateStatus={onUpdateStatus}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Done"));

    expect(onUpdateStatus).toHaveBeenCalledWith(1, "done");
  });

  it("navigates when clicking task", () => {
    render(
      <MemoryRouter>
        <TaskList
          tasks={[createMockTask({ id: 1, title: "Task" })]}
          onDelete={vi.fn()}
          onUpdateStatus={vi.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Task"));

    expect(mockNavigate).toHaveBeenCalledWith("/tasks/1");
  });

});