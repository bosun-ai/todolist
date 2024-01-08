import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddItem from './AddItem';

test('AddItem component initializes with empty state', () => {
  const wrapper = render(<AddItem addItem={() => {}} />);
  const taskInput = wrapper.getByPlaceholderText('Enter task here');
  const priorityInput = wrapper.getByPlaceholderText('Enter priority here');
  expect(taskInput.value).toBe('');
  expect(priorityInput.value).toBe('-1');
});

test('setTask updates the task in state', () => {
  const wrapper = render(<AddItem addItem={() => {}} />);
  const taskInput = wrapper.getByPlaceholderText('Enter task here');
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  expect(taskInput.value).toBe('New Task');
});

test('setPriority updates the priority in state', () => {
  const wrapper = render(<AddItem addItem={() => {}} />);
  const priorityInput = wrapper.getByPlaceholderText('Enter priority here');
  fireEvent.change(priorityInput, { target: { value: '1' } });
  expect(priorityInput.value).toBe('1');
});

test('addItem adds the item when valid and resets state', () => {
  const addItemMock = jest.fn();
  const wrapper = render(<AddItem addItem={addItemMock} />);
  const taskInput = wrapper.getByPlaceholderText('Enter task here');
  const priorityInput = wrapper.getByPlaceholderText('Enter priority here');
  const submitButton = screen.getByText(/submit/i);

  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.change(priorityInput, { target: { value: '1' } });
  fireEvent.click(submitButton);

  expect(addItemMock).toHaveBeenCalledWith({ task: 'New Task', priority: 1 });
  expect(taskInput.value).toBe('');
  expect(priorityInput.value).toBe('-1');
});

test('addItem does not add the item when invalid', () => {
  const addItemMock = jest.fn();
  const wrapper = render(<AddItem addItem={addItemMock} />);
  const submitButton = screen.getByText(/submit/i);

  fireEvent.click(submitButton);

  expect(addItemMock).not.toHaveBeenCalled();
});

test('Renders Input Form', () => {
  render(<AddItem addItem={() => {}} />);

  const taskElement = screen.getByText('Task:');
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText('Priority:');
  expect(priorityElement).toBeInTheDocument();
});
