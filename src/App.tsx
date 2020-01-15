import React, { useReducer, useState } from 'react';
import { useInterval } from './hooks';
import { AppReducer, initializer } from './reducer';
import { Cell, Grid, MenuItem, MenuWrapper, Row, Wrapper } from './components';

const App: React.FC = () => {
  const [{ board, gen, growing, aliveProb }, dispatch] = useReducer(
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
    dispatch({
      type: 'PRESS',
      payload: { coord: { i, j } }
    });
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(+e.target.value);
  };
  const handleAliveProbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'ADJUST_PROB', payload: { aliveProb: +e.target.value } });
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
        <MenuItem>
          Density:{' '}
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={aliveProb}
            onChange={handleAliveProbChange}
          />
          {(aliveProb * 100).toFixed(0)}%
        </MenuItem>
      </MenuWrapper>
    </Wrapper>
  );
};

export default App;
