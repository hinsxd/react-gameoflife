export type Coord = { i: number; j: number };

export type AppState = {
  board: boolean[][];
  gen: number;
  growing: boolean;
  cols: number;
  rows: number;
  density: number;
};

export type Action =
  | { type: 'GROW' }
  | { type: 'START_STOP' }
  | { type: 'CLICK_CELL'; payload: { coord: Coord } }
  | { type: 'PAINT_CELL'; payload: { coord: Coord } }
  | { type: 'RESTART' }
  | { type: 'ADJUST_DENSITY'; payload: { density: number } }
  | { type: 'LEAVE_BOARD' };
