import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AddTaskForm } from "./AddTaskForm";

/**
 * 🔥 mock navigate
 */
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("AddTaskForm", () => {

  it("renders form", () => {
    render(<AddTaskForm onCreate={vi.fn()} />);

    expect(screen.getByPlaceholderText("Task title")).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  it("updates input", () => {
    render(<AddTaskForm onCreate={vi.fn()} />);

    const input = screen.getByPlaceholderText("Task title");

    fireEvent.change(input, {
      target: { value: "My Task" },
    });

    expect(input).toHaveValue("My Task");
  });

  it("calls onCreate on submit", async () => {
    const onCreate = vi.fn().mockResolvedValue({});

    render(<AddTaskForm onCreate={onCreate} />);

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "Task 1" },
    });

    fireEvent.click(screen.getByText("Create Task"));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalled();
    });
  });

  it("shows error if title is empty", async () => {
    render(<AddTaskForm onCreate={vi.fn()} />);

    fireEvent.click(screen.getByText("Create Task"));

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
  });

});