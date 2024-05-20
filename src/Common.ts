export interface Item {
  /**
   * Represents the task description.
   * 
   * The `task` is a string that describes the to-do item. It should be a non-empty string
   * to ensure the item has a clear and meaningful description.
   */
  task: string;

  /**
   * Indicates the priority level of the task.
   * 
   * The `priority` is a number that determines the order in which tasks are addressed or displayed.
   * A higher number indicates a higher priority. The value should be any number but -1, as per
   * the application's validation rules, to ensure a valid priority is assigned to each task.
   */
  priority: number;
}
