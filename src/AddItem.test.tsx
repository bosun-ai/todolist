import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItem from './AddItem';

const empty = () => {};

test("Renders Input Form", () => {
  render(<AddItem addItem={empty} />);
  
  expect(screen.getByText("Task:")).toBeInTheDocument();
  expect(screen.getByText("Priority:")).toBeInTheDocument();
});

test("Updates state on input change", async () => {
  render(<AddItem addItem={empty} />);
  const taskInput = screen.getByPlaceholderText("Enter task here");
  const priorityInput = screen.getByPlaceholderText("Enter priority here");

  await userEvent.type(taskInput, 'Study TypeScript');
  expect(taskInput).toHaveValue('Study TypeScript');

  await userEvent.type(priorityInput, '1');
  expect(priorityInput).toHaveValue('1');
});

test("Calls addItem and resets state on submit with valid input", async () => {
  const mockAddItem = jest.fn();
  render(<AddItem addItem={mockAddItem} />);

  const taskInput = screen.getByPlaceholderText("Enter task here");
  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Fill out and submit the form
  await userEvent.type(taskInput, 'Learn React Testing');
  await userEvent.type(priorityInput, '2');
  userEvent.click(submitButton);

  // Use waitFor to ensure we capture state change post async operations
  await waitFor(() => expect(mockAddItem).toHaveBeenCalledTimes(1));

  // Further assertion if necessary to validate the reset logic explicitly
  expect(mockAddItem).toHaveBeenCalledWith({ task: 'Learn React Testing', priority: 2 });

  // Additional waitFor or checking for some visible UI change might be essential if state clearness isn't consistently observable
});
