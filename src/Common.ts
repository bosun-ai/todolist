export const isValid = (item: Item): boolean => {
  return item.task !== "" && item.priority !== -1;
};
