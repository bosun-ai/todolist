import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddItem } from './AddItem'; // Note: import AddItem directly to avoid translation wrapping

const mockAddItem = jest.fn();
const mockT = (key) => key; // Mock translation function for testing

beforeEach(() => {
  mockAddItem.mockClear();
});

test('Renders Input Form', () => {
  render(<AddItem addItem={mockAddItem} t={mockT} />);

  const taskElement = screen.getByText('taskLabel');
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText('priorityLabel');
  expect(priorityElement).toBeInTheDocument();

  const taskInput = screen.getByPlaceholderText('taskPlaceholder');
  expect(taskInput).toBeInTheDocument();

  const priorityInput = screen.getByPlaceholderText('priorityPlaceholder');
  expect(priorityInput).toBeInTheDocument();

  const submitButton = screen.getByDisplayValue('addButton');
  expect(submitButton).toBeInTheDocument();
});

test('setTask function updates task state', () => {
  render(<AddItem addItem={mockAddItem} t={mockT} />);
  const input = screen.getByPlaceholderText('taskPlaceholder');
  fireEvent.change(input, { target: { value: 'New task' } });
  expect(input.value).toBe('New task');
});

test('setPriority function updates priority state', () => {
  render(<AddItem addItem={mockAddItem} t={mockT} />);
  const input = screen.getByPlaceholderText('priorityPlaceholder');
  fireEvent.change(input, { target: { value: '1' } });
  expect(input.value).toBe('1');
});

test('addItem function is called with valid data', () => {
  render(<AddItem addItem={mockAddItem} t={mockT} />);
  const taskInput = screen.getByPlaceholderText('taskPlaceholder');
  const priorityInput = screen.getByPlaceholderText('priorityPlaceholder');
  const submitButton = screen.getByDisplayValue('addButton');

  fireEvent.change(taskInput, { target: { value: 'New task' } });
  fireEvent.change(priorityInput, { target: { value: '1' } });
  fireEvent.click(submitButton);

  expect(mockAddItem).toHaveBeenCalled();
  expect(mockAddItem).toHaveBeenCalledWith({ task: 'New task', priority: 1 });
});

test('addItem function is not called with invalid data', () => {
  render(<AddItem addItem={mockAddItem} t={mockT} />);
  const submitButton = screen.getByDisplayValue('addButton');

  fireEvent.click(submitButton);

  expect(mockAddItem).not.toHaveBeenCalled();
});