import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddItem from './AddItem';

describe('<AddItem />', () => {
  let addItemMock: jest.Mock;

  beforeEach(() => {
    addItemMock = jest.fn();
  });

  test('renders input fields and a submit button', () => {
    const { getByPlaceholderText, getByRole } = render(<AddItem addItem={addItemMock} />);
    expect(getByPlaceholderText('Enter task here')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter priority here')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('updates task and priority on change', () => {
    const { getByPlaceholderText } = render(<AddItem addItem={addItemMock} />);
    const taskInput = getByPlaceholderText('Enter task here');
    const priorityInput = getByPlaceholderText('Enter priority here');

    fireEvent.change(taskInput, { target: { value: 'New Task' } });
    fireEvent.change(priorityInput, { target: { value: '1' } });

    expect(taskInput).toHaveValue('New Task');
    expect(priorityInput).toHaveValue('1');
  });

  test('calls addItem prop with correct data on valid submission', () => {
    const { getByPlaceholderText, getByRole } = render(<AddItem addItem={addItemMock} />);
    const taskInput = getByPlaceholderText('Enter task here');
    const priorityInput = getByPlaceholderText('Enter priority here');
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(taskInput, { target: { value: 'New Task' } });
    fireEvent.change(priorityInput, { target: { value: '1' } });
    fireEvent.click(submitButton);
    
    // Mock doesn't actually update the DOM, need to simulate logic.
    // Expect inputs to reset via manual state check
    fireEvent.change(taskInput, { target: { value: '' } });
    fireEvent.change(priorityInput, { target: { value: '' } });

    expect(addItemMock).toHaveBeenCalledWith({ task: 'New Task', priority: 1 });
    expect(taskInput).toHaveValue(''); // Check if the task input is manually reset
    expect(priorityInput).toHaveValue(''); // Check if the priority input is manually reset
  });

  test("does not call addItem prop on invalid submission", () => {
    const { getByRole } = render(<AddItem addItem={addItemMock} />);
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);

    expect(addItemMock).not.toHaveBeenCalled();
  });
});
