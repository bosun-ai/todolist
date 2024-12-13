import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

// Check if an item with duplicate priority triggers an alert
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('adds a new item when a non-duplicate priority is used', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const taskInput = getByPlaceholderText('Enter task here');
    const priorityInput = getByPlaceholderText('Enter priority here');
    const submitButton = getByText('Submit');

    fireEvent.change(taskInput, { target: { value: 'Buy Cheese' } });
    fireEvent.change(priorityInput, { target: { value: '4' } });
    fireEvent.click(submitButton);

    const newItem = getByText('Buy Cheese');

    expect(newItem).toBeInTheDocument();
  });

  test('does not add a new item when a duplicate priority is used', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const taskInput = getByPlaceholderText('Enter task here');
    const priorityInput = getByPlaceholderText('Enter priority here');
    const submitButton = getByText('Submit');

    fireEvent.change(taskInput, { target: { value: 'New Task' } });
    fireEvent.change(priorityInput, { target: { value: '1' } }); // Duplicate priority
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Item with priorirty: 1 exists');
  });
});
