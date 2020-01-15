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
