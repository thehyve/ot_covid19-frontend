import { getComparator } from './sortingAndFiltering';

export function prepareDataClientSide(
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
  const emptyRows = pageSize - (pageEnd - pageStart);

  const sortedRows = filteredRows.sort(getComparator(columns, order, sortBy));
  const slicedRows = sortedRows.slice(pageStart, pageEnd);
  const processedRows = [...fixedRows, ...slicedRows];

  return [processedRows, emptyRows, rowCount];
}

export function prepareDataServerSide(rows, fixedRows, pageSize) {
  fixedRows.forEach((fixedRow) => {
    fixedRow.isFixedRow = true;
  });

  const pageStart = 0;
  const pageEnd = rows.length;
  const emptyRows = pageSize - (pageEnd - pageStart);
  const slicedRows = rows.slice(pageStart, pageEnd);
  const processedRows = [...fixedRows, ...slicedRows];

  return [processedRows, emptyRows];
}
