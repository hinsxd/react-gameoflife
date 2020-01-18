import { AppState } from './types';
export const generateUniverse = (
  rows: number,
  cols: number,
  density: number = 0.3
): Pick<AppState, 'universe'> => {
  const universe = [...new Array(rows)].map(() =>
    new Array(cols).fill(false).map(() => Math.random() < density)
  );
  return { universe };
};

export const isInRange = (
  rows: number,
  cols: number,
  i: number,
  j: number
): boolean => {
  return i >= 0 && i < rows && j >= 0 && j < cols;
};
