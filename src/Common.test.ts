import { isValid } from "./Common";
import { Item } from "./ToDoList";

describe("Utility Functions", () => {
  test("Validates item with correct fields", () => {
    const validItem: Item = { task: "Test Task", priority: 1 };
    expect(isValid(validItem)).toBe(true);
  });

  test("Invalidates item with empty task", () => {
    const invalidItem: Item = { task: "", priority: 1 };
    expect(isValid(invalidItem)).toBe(false);
  });

  test("Invalidates item with negative priority", () => {
    const invalidItem: Item = { task: "Test Task", priority: -1 };
    expect(isValid(invalidItem)).toBe(false);
  });
});
