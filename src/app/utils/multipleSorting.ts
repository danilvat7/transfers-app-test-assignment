import { ISortByItem } from '../interfaces';

/**
 *  Multiple sorting util
 */
export const multipleSorting = (sortBy: ISortByItem[]) => (
  a: any,
  b: any
): number => {
  let i = 0;
  let result = 0;
  while (i < sortBy.length && result === 0) {
    result =
      sortBy[i].direction *
      (a[sortBy[i].prop].toString() < b[sortBy[i].prop].toString()
        ? -1
        : a[sortBy[i].prop].toString() > b[sortBy[i].prop].toString()
        ? 1
        : 0);
    i++;
  }
  return result;
};
