import _ from 'lodash';

import { safeToString } from '../../utils';

function ascendingComparator(aObj, bObj, sortBy) {
  const a = aObj[sortBy];
  const b = bObj[sortBy];

  return (
    -(a < b) ||
    +(a > b) ||
    (a === null || a === undefined) - (b === null || b === undefined)
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
