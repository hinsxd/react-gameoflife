import React, { useReducer, Reducer, useEffect } from 'react';
import styled, { css } from 'styled-components';
import produce from 'immer';
import useInterval from './useInterval';
type AppState = {
  board: boolean[][];
  gen: number;
  growing: boolean;
  pendingGrow: { i: number; j: number } | null;
};
type Action =
  | { type: 'GROW' }
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'PRESS'; payload: { i: number; j: number } };

const AppReducer: Reducer<AppState, Action> = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'GROW':
        draft.gen++;
        if (state.pendingGrow) {
          const { i, j } = state.pendingGrow;
          draft.board[i][j] = true;
          draft.pendingGrow = null;
        }
        const { board } = state;
        for (let i = 0; i < board.length; i++) {
          const row = board[i];
          for (let j = 0; j < row.length; j++) {
            const cell = board[i][j];
            let count = 0;
            const dir = [-1, 0, 1];
            dir.forEach(dirX =>
              dir.forEach(dirY => {
                if (
                  !(dirX === 0 && dirY === 0) &&
                  i + dirX >= 0 &&
                  i + dirX < board.length &&
                  j + dirY >= 0 &&
                  j + dirY < row.length
                ) {
                  if (!!board[i + dirX][j + dirY]) {
                    count++;
                  }
                }
              })
            );
            if (cell === false && count === 3) {
              draft.board[i][j] = true;
            }
            if (cell === true && (count >= 4 || count <= 1)) {
              draft.board[i][j] = false;
            }
          }
        }
        break;
      case 'PRESS':
        draft.pendingGrow = action.payload;
        break;
      case 'START':
        draft.growing = true;
        break;
      case 'STOP':
        draft.growing = false;
        break;
    }
  });
};

const initializer = ({
  cols,
  rows
}: {
  cols: number;
  rows: number;
}): AppState => {
  const board = [...Array(rows)].map(x => Array(cols).fill(false));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j] = Math.random() > 0.5;
    }
  }
  return {
    board,
    gen: 0,
    growing: false,
    pendingGrow: null
  };
};
const App: React.FC = () => {
  const [{ board, gen, growing }, dispatch] = useReducer(
    AppReducer,
    { cols: 50, rows: 30 },
    initializer
  );

  useInterval(
    () => {
      dispatch({ type: 'GROW' });
    },
    growing ? 150 : null
  );

  const handleStart = () => dispatch({ type: 'START' });
  const handleStop = () => dispatch({ type: 'STOP' });
  const handleClick = (i: number, j: number) => () =>
    dispatch({ type: 'PRESS', payload: { i, j } });
  return (
    <Wrapper>
      <div style={{ color: '#fff', fontSize: 50 }}>
        {gen} <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <Grid>
        {board.map((row, i) => (
          <Row key={`row-${i}`}>
            {row.map((alive, j) => (
              <div
                style={{
                  flex: '0 0 10px',
                  height: '10px',
                  border: '1px solid #222',
                  background: alive ? `rgb(102, 255, 51)` : '#000'
                }}
                key={`cell-${j}`}
                onClick={handleClick(i, j)}
              />
            ))}
          </Row>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;
const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row;
`;
// const Cell = styled.div<{ alive?: boolean }>`
//   flex: 0 0 10px;
//   height: 10px;
//   border: 1px solid #222;
//   ${p =>
//     p.alive &&
//     css`

//     `}
// `;

export default App;
