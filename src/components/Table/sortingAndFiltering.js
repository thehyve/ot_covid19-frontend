import _ from 'lodash';

import { safeToString } from '../../utils';

function ascendingComparator(a, b, sortBy) {
  return (
    (a[sortBy] === null || a[sortBy] === undefined) -
      (b[sortBy] === null || b[sortBy] === undefined) ||
    +(a[sortBy] < b[sortBy]) ||
    -(a[sortBy] > b[sortBy])
  );
}

export function getComparator(columns, order, sortBy) {
  const column = columns.find((col) => col.id === sortBy);
  const columnComparator = column?.comparator
    ? column.comparator
    : ascendingComparator;

  return order === 'asc'
    ? (a, b) => columnComparator(a, b, sortBy)
    : (a, b) => -columnComparator(a, b, sortBy);
}

export function globalFilter(row, columns, value) {
  const contents = columns.reduce((accumulator, column) => {
    if (column.filterValue === false) return accumulator;

    const newValue = column.filterValue
      ? column.filterValue(row)
      : _.get(row, column.propertyPath || column.id, '');

    return [...accumulator, newValue];
  }, []);

  return contents
    .map((content) =>
      safeToString(content).toLowerCase().includes(value.toLowerCase())
    )
    .some((e) => e);
}
