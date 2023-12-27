import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItem from './AddItem';

// Existing test case
test("Renders Input Form", () => {
  render(<AddItem addItem={() => {}} />);

  const taskElement = screen.getByPlaceholderText("Enter task here");
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByPlaceholderText("Enter priority here");
  expect(priorityElement).toBeInTheDocument();
});

// Additional test cases
test('sets task and priority', () => {
  const mockAddItem = jest.fn();
  render(<AddItem addItem={mockAddItem} />);

  const taskInput = screen.getByPlaceholderText('Enter task here');
  const priorityInput = screen.getByPlaceholderText('Enter priority here');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.change(priorityInput, { target: { value: '3' } });
  fireEvent.click(submitButton);

  expect(mockAddItem).toHaveBeenCalledWith({ task: 'New Task', priority: 3 });
  expect(mockAddItem).toHaveBeenCalledTimes(1);
  // Since the component doesn't clear the inputs but the state itself,
  // we cannot check for the input values to have reset based on the current implementation.
  // We would need to mock the useState hook to monitor state directly, which is outside of our testing strategy.
});
