export type Coord = { i: number; j: number };

export type AppState = {
  board: boolean[][];
  gen: number;
  growing: boolean;
  cols: number;
  rows: number;
  aliveProb: number;
  cellOnHover: Coord | null;
  mousePressed: boolean;
};

export type Action =
  | { type: 'GROW' }
  | { type: 'START_STOP' }
  | { type: 'CLICK_CELL'; payload: { coord: Coord } }
  | { type: 'PAINT_CELL'; payload: { coord: Coord } }
  | { type: 'RESTART' }
  | { type: 'ADJUST_PROB'; payload: { aliveProb: number } }
  | { type: 'HOLD_MOUSE' }
  | { type: 'RELEASE_MOUSE' }
  | { type: 'RESTART' }
  | { type: 'ENTER_CELL'; payload: { coord: Coord } }
  | { type: 'LEAVE_BOARD' };
