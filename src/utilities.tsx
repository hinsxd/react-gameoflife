import { AppState } from './types';
export const generateBoard = (
  rows: number,
  cols: number,
  density: number = 0.3
): AppState['board'] => {
  return [...new Array(rows)].map(() =>
    new Array(cols).fill(false).map(() => Math.random() < density)
  );
};

export const isInRange = (
  rows: number,
  cols: number,
  i: number,
  j: number
): boolean => {
  return i >= 0 && i < rows && j >= 0 && j < cols;
};
