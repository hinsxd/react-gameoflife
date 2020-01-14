import React, { useReducer, Reducer, useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import useInterval from './useInterval';
type AppState = {
  board: boolean[][];
  gen: number;
  growing: boolean;
  cols: number;
  rows: number;
  aliveProp: number;
};
type Action =
  | { type: 'GROW' }
  | { type: 'START_STOP' }
  | { type: 'PRESS'; payload: { i: number; j: number } }
  | { type: 'RESTART' };

const AppReducer: Reducer<AppState, Action> = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'GROW':
        draft.gen++;
        const { board } = state;
        board.forEach((row, i) => {
          row.forEach((cell, j) => {
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
          });
        });
        for (let i = 0; i < board.length; i++) {
          const row = board[i];
          for (let j = 0; j < row.length; j++) {}
        }
        break;
      case 'PRESS':
        const { i, j } = action.payload;
        draft.board[i][j] = !draft.board[i][j];
        break;
      case 'START_STOP':
        draft.growing = !draft.growing;
        break;
      case 'RESTART':
        const { rows, cols, aliveProp } = state;
        draft.board = generateBoard(rows, cols, aliveProp);
        draft.growing = false;
        draft.gen = 0;
    }
  });
};

const generateBoard = (
  rows: number,
  cols: number,
  aliveProp: number = 0.5
): AppState['board'] => {
  return [...new Array(rows)].map(() =>
    new Array(cols).fill(false).map(() => Math.random() > aliveProp)
  );
};
const initializer = ({
  cols,
  rows,
  aliveProp = 0.5
}: {
  cols: number;
  rows: number;
  aliveProp?: number;
}): AppState => {
  return {
    board: generateBoard(rows, cols, aliveProp),
    gen: 0,
    growing: false,
    cols,
    rows,
    aliveProp
  };
};
const App: React.FC = () => {
  const [{ board, gen, growing }, dispatch] = useReducer(
    AppReducer,
    { cols: 60, rows: 40 },
    initializer
  );
  const [interval, setInterval] = useState(100);

  useInterval(
    () => {
      dispatch({ type: 'GROW' });
    },
    growing ? interval : null
  );

  const handleStartStop = () => dispatch({ type: 'START_STOP' });
  const handleClick = (i: number, j: number) => () => {
    dispatch({ type: 'PRESS', payload: { i, j } });
  };
  const handleRestart = () => {
    console.log('restart');
    dispatch({ type: 'RESTART' });
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(+e.target.value);
  };
  return (
    <Wrapper>
      <Grid>
        {board.map((row, i) => (
          <Row key={`row-${i}`}>
            {row.map((alive, j) => (
              <Cell
                alive={alive}
                key={`cell-${j}`}
                onClick={handleClick(i, j)}
              />
            ))}
          </Row>
        ))}
      </Grid>
      <MenuWrapper>
        <MenuItem>Generations: {gen}</MenuItem>
        <MenuItem>
          Interval:{' '}
          <input
            type="range"
            min="20"
            max="1000"
            step="10"
            value={interval}
            onChange={handleIntervalChange}
          />
          {interval}ms
        </MenuItem>
        <MenuItem onClick={handleStartStop}>Start / Stop / Resume</MenuItem>
        <MenuItem onClick={handleRestart}>Restart</MenuItem>
      </MenuWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Cell = styled.div<{ alive: boolean }>`
  flex: 0 0 10px;
  height: 10px;
  border: 1px solid #353535;
  background: ${p => (p.alive ? `rgb(102, 255, 51)` : '#000')};
`;
const MenuWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MenuItem = styled.div`
  flex: 0;
  width: 300px;
  padding: 10px;
  margin: 3px;
  background: rgb(102, 255, 51);
  color: black;
  text-align: center;
`;

export default App;
