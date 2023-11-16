import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from '@testing-library/user-event';

// Mock the window.alert function for the tests
window.alert = jest.fn();

test("Renders Task Label", () => {
  render(<App />);
  // The inputs might not be associated with the labels through the 'for' attribute
  // thus getByText is used instead of getByLabelText or getByPlaceholderText
  const taskElement = screen.getByText(/Task:/i);
  expect(taskElement).toBeInTheDocument();
});

test("Renders Priority Label", () => {
  render(<App />);
  const priorityElement = screen.getByText(/Priority:/i);
  expect(priorityElement).toBeInTheDocument();
});

test("Renders Table Header - Task Column", () => {
  render(<App />);
  const headerTaskElement = screen.getByText("Task");
  expect(headerTaskElement).toBeInTheDocument();
});

test("Renders Table Header - Priority Column", () => {
  render(<App />);
  const headerPriorityElement = screen.getByText("Priority");
  expect(headerPriorityElement).toBeInTheDocument();
});

test("Renders Table  - First Row Task", () => {
  render(<App />);
  const firstRowTaskElement = screen.getByText("Pick up Milk");
  expect(firstRowTaskElement).toBeInTheDocument();
});

test("Renders Table  - First Row Priority", () => {
  render(<App />);
  const firstRowPriorityElement = screen.getByText("1");
  expect(firstRowPriorityElement).toBeInTheDocument();
});

// Testing the addItem method for adding an item with existing priority
test("addItem method should not add a new item if the priority exists", () => {
  render(<App />);
  const inputTask = screen.getByPlaceholderText("Enter task here");
  const inputPriority = screen.getByPlaceholderText("Enter priority here");
  const addButton = screen.getByText("Add"); // Updated to the actual text

  userEvent.type(inputTask, 'New Task');
  userEvent.type(inputPriority, '1'); // Priority of an existing item
  userEvent.click(addButton);

  // The new task should not be found because the priority is the same as an existing item's
  const newTask = screen.queryByText('New Task');
  expect(newTask).not.toBeInTheDocument();

  // Confirm an alert was shown
  expect(window.alert).toHaveBeenCalledWith("Item with priorirty: 1 exists");
});

// Testing whether addItem properly adds a new item with unique priority
test("addItem method should add a new item if the priority doesn't exist", () => {
  render(<App />);
  const inputTask = screen.getByPlaceholderText("Enter task here");
  const inputPriority = screen.getByPlaceholderText("Enter priority here");
  const addButton = screen.getByText("Add"); // Updated to the actual text

  userEvent.type(inputTask, 'New Unique Task');
  userEvent.type(inputPriority, '100'); // Entering a priority that doesn't exist
  userEvent.click(addButton);

  // Look for the new task in the DOM
  const newTask = screen.getByText('New Unique Task');
  expect(newTask).toBeInTheDocument();
  // Check if the new priority also got added
  const newPriority = screen.getByText('100');
  expect(newPriority).toBeInTheDocument();

  // Confirm no alert was shown
  expect(window.alert).not.toHaveBeenCalledWith("Item with priorirty: 100 exists");
});