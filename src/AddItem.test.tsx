import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddItem from './AddItem';

const mockAddItem = jest.fn();

beforeEach(() => {
  mockAddItem.mockClear();
});

test('Renders Input Form', () => {
  render(<AddItem addItem={mockAddItem} />);

  const taskElement = screen.getByText('Task:');
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText('Priority:');
  expect(priorityElement).toBeInTheDocument();

  const taskInput = screen.getByPlaceholderText('Enter task here');
  expect(taskInput).toBeInTheDocument();

  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  expect(priorityInput).toBeInTheDocument();

  const submitButton = screen.getByRole('button');
  expect(submitButton).toBeInTheDocument();
});

test('setTask function updates task state', () => {
  render(<AddItem addItem={mockAddItem} />);
  const input = screen.getByPlaceholderText('Enter task here');
  fireEvent.change(input, { target: { value: 'New task' } });
  expect(input.value).toBe('New task');
});

test('setPriority function updates priority state', () => {
  render(<AddItem addItem={mockAddItem} />);
  const input = screen.getByPlaceholderText('Enter priority here');
  fireEvent.change(input, { target: { value: '1' } });
  expect(input.value).toBe('1');
});

test('addItem function is called with valid data', () => {
  render(<AddItem addItem={mockAddItem} />);
  const taskInput = screen.getByPlaceholderText('Enter task here');
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  const submitButton = screen.getByRole('button');

  fireEvent.change(taskInput, { target: { value: 'New task' } });
  fireEvent.change(priorityInput, { target: { value: '1' } });
  fireEvent.click(submitButton);

  expect(mockAddItem).toHaveBeenCalled();
  expect(mockAddItem).toHaveBeenCalledWith({ task: 'New task', priority: 1 });
});

test('addItem function is not called with invalid data', () => {
  render(<AddItem addItem={mockAddItem} />);
  const submitButton = screen.getByRole('button');

  fireEvent.click(submitButton);

  expect(mockAddItem).not.toHaveBeenCalled();
});