import { render, fireEvent, screen } from "@testing-library/react";
import AddItem from "./AddItem"; // adjust import as necessary

const empty = jest.fn();

// Existing test
test("Renders Input Form", () => {
  render(<AddItem addItem={empty} />);
  const taskElement = screen.getByText("Task:");
  expect(taskElement).toBeInTheDocument();
  const priorityElement = screen.getByText("Priority:");
  expect(priorityElement).toBeInTheDocument();
});

// New test scenario 1
test("Enters values into task and priority inputs and checks for updates", () => {
  render(<AddItem addItem={empty} />);

  const taskInput = screen.getByPlaceholderText("Enter task here");
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  expect(taskInput).toHaveValue('New Task');

  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  fireEvent.change(priorityInput, { target: { value: '5' } });
  expect(priorityInput).toHaveValue("5");
});

// Corrected test scenario 2.1: Submit with valid input
test("Submits form with valid input and checks if addItem is called", () => {
  render(<AddItem addItem={empty} />);

  const taskInput = screen.getByPlaceholderText("Enter task here");
  fireEvent.change(taskInput, { target: { value: 'Test Task' } });

  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  fireEvent.change(priorityInput, { target: { value: '3' } });

  const submitButton = screen.getByRole('button', { name: 'Submit' }); // Corrected line
  fireEvent.click(submitButton);

  expect(empty).toHaveBeenCalledWith(expect.objectContaining({ task: 'Test Task', priority: 3 }));
});

// Corrected test scenario 2.2: Submit with invalid input
test("Attempts to submit form with invalid input and checks if addItem is not called", () => {
  render(<AddItem addItem={empty} />);
  empty.mockReset(); // Reset the mock to clear any previous calls

  const taskInput = screen.getByPlaceholderText("Enter task here");
  fireEvent.change(taskInput, { target: { value: '' } }); // Empty task is invalid

  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  fireEvent.change(priorityInput, { target: { value: '-1' } }); // -1 priority is invalid

  const submitButton = screen.getByRole('button', { name: 'Submit' }); // Corrected line
  fireEvent.click(submitButton);

  expect(empty).not.toHaveBeenCalled();
});
