export const remFilter = (filters, oldFilter) =>
  filters.filter((f) => !Object.keys(f).includes(oldFilter));

export const getFilter = (filters, curFilter) =>
  filters.find((f) => Object.keys(f).includes(curFilter))?.[curFilter];

export const addFilter = (filters, newFilter) => [
  ...remFilter(filters, Object.keys(newFilter)[0]),
  newFilter,
];

export const includeFilter = (filters, curFilter) =>
  filters.map((f) => Object.keys(f)[0] === curFilter).some((v) => v);
