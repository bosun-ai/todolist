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
    const { getByPlaceholderText, getByValue } = render(<AddItem addItem={addItemMock} />);
    expect(getByPlaceholderText('Enter task here')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter priority here')).toBeInTheDocument();
    expect(getByValue('Submit')).toBeInTheDocument();
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
    const { getByPlaceholderText, getByValue } = render(<AddItem addItem={addItemMock} />);
    const taskInput = getByPlaceholderText('Enter task here');
    const priorityInput = getByPlaceholderText('Enter priority here');
    const submitButton = getByValue('Submit');

    fireEvent.change(taskInput, { target: { value: 'New Task' } });
    fireEvent.change(priorityInput, { target: { value: '1' } });
    fireEvent.click(submitButton);

    expect(addItemMock).toHaveBeenCalledWith({ task: 'New Task', priority: 1 });
    expect(taskInput).toHaveValue(''); // Check if the task input is reset
    expect(priorityInput).toHaveValue(''); // Check if the priority input is reset
  });

  test("does not call addItem prop on invalid submission", () => {
    const { getByValue } = render(<AddItem addItem={addItemMock} />);
    const submitButton = getByValue("Submit");

    fireEvent.click(submitButton);

    expect(addItemMock).not.toHaveBeenCalled();
  });
});
