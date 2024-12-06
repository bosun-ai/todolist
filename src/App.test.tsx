import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("App Component", () => {
  test("Renders Labels and Table", () => {
    render(<App />);
    const taskLabel = screen.getByText("Task:");
    expect(taskLabel).toBeInTheDocument();

    const priorityLabel = screen.getByText("Priority:");
    expect(priorityLabel).toBeInTheDocument();

    const taskHeader = screen.getByText("Task");
    expect(taskHeader).toBeInTheDocument();

    const priorityHeader = screen.getByText("Priority");
    expect(priorityHeader).toBeInTheDocument();
  });

  test("Prevents adding duplicate priority", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Enter task here"), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByPlaceholderText("Enter priority here"), { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(window.alert).toHaveBeenCalledWith("Item with priorirty: 1 exists");
  });

  test("Adds new task with unique priority", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Enter task here"), { target: { value: "New Task" } });
    fireEvent.change(screen.getByPlaceholderText("Enter priority here"), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
