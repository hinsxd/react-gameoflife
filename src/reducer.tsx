import { Reducer } from 'react';
import produce from 'immer';
import { AppState, Action } from './types';
import { generateUniverse, isInRange } from './utilities';

export const AppReducer: Reducer<AppState, Action> = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'GROW': {
        draft.gen++;
        const { universe } = state;
        universe.forEach((row, i) => {
          row.forEach((cell, j) => {
            let count = 0;
            for (let dirX = -1; dirX <= 1; dirX++) {
              for (let dirY = -1; dirY <= 1; dirY++) {
                if (
                  !(dirX === 0 && dirY === 0) &&
                  isInRange(universe.length, row.length, i + dirX, j + dirY) &&
                  universe[i + dirX][j + dirY]
                ) {
                  count++;
                }
              }
            }

            if (cell === false && count === 3) {
              draft.universe[i][j] = true;
            }
            if (cell === true && (count >= 4 || count <= 1)) {
              draft.universe[i][j] = false;
            }
          });
        });

        break;
      }
      case 'CLICK_CELL': {
        const { i, j } = action.payload.coord;
        draft.universe[i][j] = !draft.universe[i][j];
        break;
      }
      case 'PAINT_CELL': {
        const { i, j } = action.payload.coord;
        draft.universe[i][j] = true;
        break;
      }
      case 'START_STOP': {
        draft.growing = !draft.growing;
        break;
      }
      case 'RESTART': {
        const { rows, cols, density } = state;
        const { universe } = generateUniverse(rows, cols, density);
        draft.universe = universe;
        draft.growing = false;
        draft.gen = 0;

        break;
      }
      case 'ADJUST_DENSITY': {
        draft.density = action.payload.density;
        break;
      }
    }
  });
};

export const initializer = ({
  cols,
  rows,
  density = 0.3
}: {
  cols: number;
  rows: number;
  density?: number;
}): AppState => {
  const { universe } = generateUniverse(rows, cols, density);
  return {
    universe,
    gen: 0,
    growing: false,
    cols,
    rows,
    density,
    lives: [],
    neibourCount: []
  };
};
