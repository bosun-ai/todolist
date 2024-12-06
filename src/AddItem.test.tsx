import { render, screen, fireEvent } from "@testing-library/react";
import AddItem from "../src/AddItem";

const mockAddItem = jest.fn();

describe("AddItem Component", () => {
  beforeEach(() => {
    render(<AddItem addItem={mockAddItem} />);
  });

  test("Renders Input Form", () => {
    const taskElement = screen.getByText("Task:");
    expect(taskElement).toBeInTheDocument();

    const priorityElement = screen.getByText("Priority:");
    expect(priorityElement).toBeInTheDocument();
  });

  test("Adds valid item", () => {
    fireEvent.change(screen.getByPlaceholderText("Enter task here"), { target: { value: "Clean the house" } });
    fireEvent.change(screen.getByPlaceholderText("Enter priority here"), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(mockAddItem).toHaveBeenCalledWith({ task: "Clean the house", priority: 4 });
  });

  test("Does not add invalid item", () => {
    fireEvent.change(screen.getByPlaceholderText("Enter task here"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(mockAddItem).not.toHaveBeenCalled();
  });
});
