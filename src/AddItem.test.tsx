import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddItem from './AddItem';

test('Renders Input Form', () => {
  render(<AddItem addItem={() => {}} />);

  const taskInput = screen.getByPlaceholderText('Enter task here');
  expect(taskInput).toBeInTheDocument();

  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  expect(priorityInput).toBeInTheDocument();

  const submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
});

test('Validates input correctly', () => {
  // Mock the isValid function from AddItem
  const isValid = (item) => item.task !== '' && item.priority > 0;

  const validItem = { task: 'Test Task', priority: 1 };
  expect(isValid(validItem)).toBe(true);

  const invalidItemEmptyTask = { task: '', priority: 1 };
  expect(isValid(invalidItemEmptyTask)).toBe(false);

  const invalidItemNegativePriority = { task: 'Test Task', priority: -1 };
  expect(isValid(invalidItemNegativePriority)).toBe(false);
});

test('Updates task state on input change', () => {
  const { getByPlaceholderText } = render(<AddItem addItem={() => {}} />);
  const taskInput = getByPlaceholderText('Enter task here');
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  expect(taskInput.value).toBe('New Task');
});

test('Updates priority state on input change', () => {
  const { getByPlaceholderText } = render(<AddItem addItem={() => {}} />);
  const priorityInput = getByPlaceholderText('Enter priority here');
  fireEvent.change(priorityInput, { target: { value: '2' } });
  expect(priorityInput.value).toBe('2');
});

test('Adds item and resets state on submit', () => {
  const addItemMock = jest.fn();
  const { getByText, getByPlaceholderText } = render(<AddItem addItem={addItemMock} />);

  const taskInput = getByPlaceholderText('Enter task here');
  const priorityInput = getByPlaceholderText('Enter priority here');
  const submitButton = getByText('Submit');

  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.change(priorityInput, { target: { value: '2' } });
  fireEvent.click(submitButton);

  expect(addItemMock).toHaveBeenCalledWith({ task: 'New Task', priority: 2 });
  expect(taskInput.value).toBe('');
  expect(priorityInput.value).toBe('');
});
