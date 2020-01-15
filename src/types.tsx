export type Coord = { i: number; j: number };

export type AppState = {
  board: boolean[][];
  gen: number;
  growing: boolean;
  cols: number;
  rows: number;
  aliveProb: number;
};

export type Action =
  | { type: 'GROW' }
  | { type: 'START_STOP' }
  | { type: 'PRESS'; payload: { coord: Coord } }
  | { type: 'RESTART' }
  | { type: 'ADJUST_PROB'; payload: { aliveProb: number } };
