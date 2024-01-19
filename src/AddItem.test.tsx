import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddItem from '../src/AddItem';

test('Renders Input Form', () => {
  render(<AddItem addItem={() => {}} />);

  const taskElement = screen.getByText('Task:');
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText('Priority:');
  expect(priorityElement).toBeInTheDocument();
});

test('Updates task state on input change', () => {
  render(<AddItem addItem={() => {}} />);

  const taskInput = screen.getByPlaceholderText('Enter task here');
  fireEvent.change(taskInput, { target: { value: 'New Task' } });

  expect(taskInput.value).toBe('New Task');
});

test('Updates priority state on input change', () => {
  render(<AddItem addItem={() => {}} />);

  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  fireEvent.change(priorityInput, { target: { value: '5' } });

  expect(priorityInput.value).toBe('5');
});

test('Adds item on submit with valid data', async () => {
  const mockAddItem = jest.fn();
  render(<AddItem addItem={mockAddItem} />);

  const taskInput = screen.getByPlaceholderText('Enter task here');
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  const form = screen.getByTestId('add-item-form');

  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.change(priorityInput, { target: { value: '5' } });
  fireEvent.submit(form);

  await waitFor(() => {
    expect(mockAddItem).toHaveBeenCalledWith({ task: 'New Task', priority: 5 });
    expect(taskInput.value).toBe('');
    expect(priorityInput.value).toBe('-1');
  });
});

test('Does not add item on submit with invalid data', () => {
  const mockAddItem = jest.fn();
  render(<AddItem addItem={mockAddItem} />);

  const taskInput = screen.getByPlaceholderText('Enter task here');
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  const form = screen.getByTestId('add-item-form');

  fireEvent.change(taskInput, { target: { value: '' } });
  fireEvent.change(priorityInput, { target: { value: '-1' } });
  fireEvent.submit(form);

  expect(mockAddItem).not.toHaveBeenCalled();
});
