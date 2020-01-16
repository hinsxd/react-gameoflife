import React, { useReducer, useState } from 'react';
import { useInterval } from './hooks';
import { AppReducer, initializer } from './reducer';
import { Cell, Grid, MenuItem, MenuWrapper, Row, Wrapper } from './components';

const App: React.FC = () => {
  const [{ board, gen, growing, density, mousePressed }, dispatch] = useReducer(
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

  const handleNextGen = () => {
    if (!growing) dispatch({ type: 'GROW' });
  };

  const handleClick = (i: number, j: number) => () => {
    dispatch({
      type: 'CLICK_CELL',
      payload: { coord: { i, j } }
    });
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(+e.target.value);
  };
  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'ADJUST_DENSITY', payload: { density: +e.target.value } });
  };

  const handleHoverCell = (i: number, j: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (mousePressed) {
      dispatch({
        type: 'PAINT_CELL',
        payload: { coord: { i, j } }
      });
    }
  };

  const handleMouseHold = () => {
    dispatch({ type: 'HOLD_MOUSE' });
  };
  const handleMouseRelease = () => {
    dispatch({ type: 'RELEASE_MOUSE' });
  };
  const handleMouseLeave = () => {
    dispatch({ type: 'LEAVE_BOARD' });
  };
  return (
    <Wrapper>
      <Grid
        onMouseDown={handleMouseHold}
        onMouseUp={handleMouseRelease}
        onMouseLeave={handleMouseLeave}
      >
        {board.map((row, i) => (
          <Row key={`row-${i}`}>
            {row.map((alive, j) => (
              <Cell
                alive={alive}
                key={`cell-${j}`}
                onMouseDown={handleClick(i, j)}
                onMouseEnter={handleHoverCell(i, j)}
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
        <MenuItem onClick={handleNextGen}>Next Generation</MenuItem>
        <MenuItem onClick={handleRestart}>Restart</MenuItem>
        <MenuItem>
          Density:{' '}
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={density}
            onChange={handleDensityChange}
          />
          {(density * 100).toFixed(0)}%
        </MenuItem>
      </MenuWrapper>
    </Wrapper>
  );
};

export default App;
