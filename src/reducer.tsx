import { Reducer } from 'react';
import produce from 'immer';
import { AppState, Action } from './types';
import { generateBoard } from './utilities';

export const AppReducer: Reducer<AppState, Action> = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'GROW': {
        draft.gen++;
        const { board } = state;
        board.forEach((row, i) => {
          row.forEach((cell, j) => {
            let count = 0;
            for (let dirX = -1; dirX <= 1; dirX++) {
              for (let dirY = -1; dirY <= 1; dirY++) {
                if (
                  !(dirX === 0 && dirY === 0) &&
                  i + dirX >= 0 &&
                  i + dirX < board.length &&
                  j + dirY >= 0 &&
                  j + dirY < row.length &&
                  board[i + dirX][j + dirY]
                ) {
                  count++;
                }
              }
            }

            if (cell === false && count === 3) {
              draft.board[i][j] = true;
            }
            if (cell === true && (count >= 4 || count <= 1)) {
              draft.board[i][j] = false;
            }
          });
        });

        break;
      }
      case 'CLICK_CELL': {
        const { i, j } = action.payload.coord;
        draft.board[i][j] = !draft.board[i][j];
        break;
      }
      case 'PAINT_CELL': {
        const { i, j } = action.payload.coord;
        draft.board[i][j] = true;
        break;
      }
      case 'START_STOP': {
        draft.growing = !draft.growing;
        break;
      }
      case 'RESTART': {
        const { rows, cols, aliveProb } = state;
        draft.board = generateBoard(rows, cols, aliveProb);
        draft.growing = false;
        draft.gen = 0;

        break;
      }
      case 'ADJUST_PROB': {
        draft.aliveProb = action.payload.aliveProb;
        break;
      }
      case 'HOLD_MOUSE': {
        draft.mousePressed = true;
        break;
      }
      case 'RELEASE_MOUSE': {
        draft.mousePressed = false;
        break;
      }
      // case 'ENTER_CELL': {
      //   draft.cellOnHover = action.payload.coord;
      //   break;
      // }
      // case 'LEAVE_BOARD': {
      //   draft.cellOnHover = null;
      //   break;
      // }
    }
  });
};

export const initializer = ({
  cols,
  rows,
  aliveProb = 0.5
}: {
  cols: number;
  rows: number;
  aliveProb?: number;
}): AppState => {
  return {
    board: generateBoard(rows, cols, aliveProb),
    gen: 0,
    growing: false,
    cols,
    rows,
    aliveProb,
    // cellOnHover: null,
    mousePressed: false
  };
};
