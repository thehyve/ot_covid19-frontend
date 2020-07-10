import { getComparator } from './sortingAndFiltering';

export function prepareData(
  rows,
  columns,
  fixedRows,
  page,
  pageSize,
  order,
  sortBy,
  targetSearch
) {
  fixedRows.forEach((fixedRow) => {
    fixedRow.isFixedRow = true;
  });

  const filteredRows = targetSearch
    ? rows.filter((row) => {
        if (row.ensembl_id?.toLowerCase().includes(targetSearch.toLowerCase()))
          return true;
        if (row.uniprot_ids?.toLowerCase().includes(targetSearch.toLowerCase()))
          return true;
        if (row.name?.toLowerCase().includes(targetSearch.toLowerCase()))
          return true;

        return false;
      })
    : rows;

  const rowCount = filteredRows.length;
  const pageStart = page * pageSize;
  const pageEnd = Math.min(page * pageSize + pageSize, rowCount);

  const sortedRows = filteredRows.sort(getComparator(columns, order, sortBy));
  const slicedRows = sortedRows.slice(pageStart, pageEnd);
  const processedRows = [...fixedRows, ...slicedRows];

  return [processedRows, rowCount];
}
