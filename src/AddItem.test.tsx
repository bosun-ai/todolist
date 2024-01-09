import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddItem from './AddItem';

test('renders input form', () => {
  render(<AddItem addItem={jest.fn()} />);
  const taskInput = screen.getByPlaceholderText('Enter task here');
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(taskInput).toBeInTheDocument();
  expect(priorityInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('allows input to be set', () => {
  render(<AddItem addItem={jest.fn()} />);
  const taskInput = screen.getByPlaceholderText('Enter task here');
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  expect(taskInput.value).toBe('New Task');
});

test('allows priority to be set', () => {
  render(<AddItem addItem={jest.fn()} />);
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  fireEvent.change(priorityInput, { target: { value: '5' } });
  expect(priorityInput.value).toBe('5');
});

test('submits valid item', () => {
  const addItemMock = jest.fn();
  render(<AddItem addItem={addItemMock} />);
  const taskInput = screen.getByPlaceholderText('Enter task here');
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.change(priorityInput, { target: { value: '5' } });
  fireEvent.click(submitButton);
  expect(addItemMock).toHaveBeenCalledWith({ task: 'New Task', priority: 5 });
});

test('does not submit invalid item', () => {
  const addItemMock = jest.fn();
  render(<AddItem addItem={addItemMock} />);
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);
  expect(addItemMock).not.toHaveBeenCalled();
});

test('resets input after submission', () => {
  const addItemMock = jest.fn();
  render(<AddItem addItem={addItemMock} />);
  const taskInput = screen.getByPlaceholderText('Enter task here');
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.change(priorityInput, { target: { value: '5' } });
  fireEvent.click(submitButton);
  expect(taskInput.value).toBe('');
  expect(priorityInput.value).toBe('-1');
});
