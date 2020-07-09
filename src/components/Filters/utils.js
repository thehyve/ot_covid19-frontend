export const remFilter = (filters, oldFilter) =>
  filters.filter((f) => !Object.keys(f).includes(oldFilter));

export const getFilter = (filters, curFilter) =>
  filters.find((f) => Object.keys(f).includes(curFilter))?.[curFilter];

export const addFilter = (filters, newFilter) => {
  const newFilters = [...filters];

  let prevFilterIndex = filters.findIndex(
    (filter) => Object.keys(filter)[0] === Object.keys(newFilter)[0]
  );

  if (prevFilterIndex !== -1) {
    newFilters[prevFilterIndex] = newFilter;
  } else {
    newFilters.push(newFilter);
  }

  return newFilters;
};

export const includeFilter = (filters, curFilter) =>
  filters.map((f) => Object.keys(f)[0] === curFilter).some((v) => v);
