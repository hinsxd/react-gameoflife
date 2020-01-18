import { AppState, Coord } from './types';
export const generateUniverse = (
  rows: number,
  cols: number,
  density: number = 0.3
): Pick<AppState, 'universe' | 'lives'> => {
  const lives: Coord[] = [];
  const universe = generateEmptyUniverse(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const alive = Math.random() < density;
      if (alive) {
        lives.push({ i, j });
        universe[i][j] = true;
      }
    }
  }
  return { universe, lives };
};

export const generateEmptyUniverse = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );
};

export const generateNeighbours = (
  rows: number,
  cols: number,
  i: number,
  j: number
) => {
  const neighbours: Coord[] = [];
  for (let dirX = -1; dirX <= 1; dirX++) {
    for (let dirY = -1; dirY <= 1; dirY++) {
      if (
        !(dirX === 0 && dirY === 0) &&
        isInRange(rows, cols, i + dirX, j + dirY)
      ) {
        neighbours.push({ i: i + dirX, j: j + dirY });
      }
    }
  }
  return neighbours;
};

export const isInRange = (
  rows: number,
  cols: number,
  i: number,
  j: number
): boolean => {
  return i >= 0 && i < rows && j >= 0 && j < cols;
};
