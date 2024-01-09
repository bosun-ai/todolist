import { render, screen, fireEvent } from "@testing-library/react";
import AddItem from "./AddItem";

test("Renders Input Form", () => {
  render(<AddItem addItem={() => {}} />);

  const taskElement = screen.getByPlaceholderText("Enter task here");
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByPlaceholderText("Enter priority here");
  expect(priorityElement).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});

test("Updates task state on input change", () => {
  render(<AddItem addItem={() => {}} />);
  const taskInput = screen.getByPlaceholderText("Enter task here");
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  expect(taskInput.value).toBe('New Task');
});

test("Updates priority state on input change", () => {
  render(<AddItem addItem={() => {}} />);
  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  fireEvent.change(priorityInput, { target: { value: '1' } });
  expect(priorityInput.value).toBe('1');
});

test("Calls addItem on submit with valid input", () => {
  const addItemMock = jest.fn();
  render(<AddItem addItem={addItemMock} />);

  const taskInput = screen.getByPlaceholderText("Enter task here");
  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.change(priorityInput, { target: { value: '1' } });
  fireEvent.click(submitButton);

  expect(addItemMock).toHaveBeenCalledWith({ task: 'New Task', priority: 1 });
});

test("Does not call addItem on submit with invalid input", () => {
  const addItemMock = jest.fn();
  render(<AddItem addItem={addItemMock} />);

  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  expect(addItemMock).not.toHaveBeenCalled();
});
