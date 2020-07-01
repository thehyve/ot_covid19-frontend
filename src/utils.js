// returns a list of breakpoints translating values from hidden prop
export const getHiddenBreakpoints = (column) =>
  column.hidden?.reduce(
    (obj, b) => {
      if (b.includes('Only')) {
        return { ...obj, only: [...obj.only, b.replace(/Only/, '')] };
      }
      return { ...obj, [b]: true };
    },
    { only: [] }
  );

// compares a breakpoint against a breakpoint helper
export const breakpointMatch = (breakpoint, breakpointHelper) => {
  const breakpointMap = { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 };
  const isDownComparator = breakpointHelper.includes('Down');
  const isUpComparator = breakpointHelper.includes('Up');

  const breakpointIndex = breakpointMap[breakpoint];
  const breakpointHelperIndex =
    breakpointMap[breakpointHelper.replace(/Down|Up|Only/g, '')];

  if (breakpointIndex === breakpointHelperIndex) {
    return true;
  }

  if (isDownComparator && breakpointIndex <= breakpointHelperIndex) {
    return true;
  }

  if (isUpComparator && breakpointIndex >= breakpointHelperIndex) {
    return true;
  }

  return false;
};

// converts to string ignoring objects/functions with might be dangerous
export const safeToString = (x) => {
  switch (typeof x) {
    case 'object':
      return 'object';
    case 'function':
      return 'function';
    case undefined:
    case null:
      return '';
    default:
      return x + '';
  }
};

// split strings by open/close square bracket
export const splitStringInBrackets = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.split(/[\[\]]+/).filter((e) => e);

// split strings by open/close parentheses
export const splitStringInParentheses = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.split(/[\(\)]+/).filter((e) => e);

// comparators
export const comparatorFromAccessorLength = (accessor, splitChar) => {
  if (splitChar) {
    return (a, b) =>
      (a[accessor]?.split(splitChar).length ?? 0) -
      (b[accessor]?.split(splitChar).length ?? 0);
  } else {
    return (a, b) => (a[accessor]?.length ?? 0) - (b[accessor]?.length ?? 0);
  }
};

// TODO: null values must go last even if sorting ascending
export const comparatorFromMaps = (accessor, map, settings = {}) => (a, b) => {
  const aValue =
    parseInt(map(a[accessor])) || (settings.ascending ? Infinity : -1);
  const bValue =
    parseInt(map(b[accessor])) || (settings.ascending ? Infinity : -1);

  return settings.ascending ? bValue - aValue : aValue - bValue;
};

// label stuff
export const naLabel = 'N/A';

// client data versioning
export const getDatasetRevision = () => localStorage.getItem('datasetRevision');
export const setDatasetRevision = (rev) =>
  localStorage.setItem('datasetRevision', rev);
