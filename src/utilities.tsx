import { AppState } from './types';
export const generateBoard = (
  rows: number,
  cols: number,
  aliveProb: number = 0.5
): AppState['board'] => {
  return [...new Array(rows)].map(() =>
    new Array(cols).fill(false).map(() => Math.random() < aliveProb)
  );
};
