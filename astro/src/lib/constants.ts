export const NUM_COLS = 7;

export const GRID_SIZE = {
    square: {
      row: 1,
      col: 1,
      className: "grid-square",
    },
    portrait: {
      row: 1,
      col: 1,
      className: "grid-portrait",
    },
    landscape: {
      row: 1,
      col: 1,
      className: "grid-landscape",
    },
    bigSquare: {
      row: 2,
      col: 2,
      className: "grid-big-square",
    }
  } as const;
