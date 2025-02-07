import SquareModel from "../models/SquareModel";

const rowStartClasses: Record<number, string> = {
  1: "row-start-1",
  2: "row-start-2",
  3: "row-start-3",
  4: "row-start-4",
  5: "row-start-5",
  6: "row-start-6",
  7: "row-start-7",
  8: "row-start-8",
};

const colStartClasses: Record<number, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
  7: "col-start-7",
  8: "col-start-8",
};

export const getSquareStyles = (
  square: SquareModel,
  playingAsWhite: boolean,
) => {
  const rowIndex = playingAsWhite ? 8 - square.row : square.row + 1;
  const colIndex = playingAsWhite ? square.column + 1 : 8 - square.column;
  const rowStartStyle = rowStartClasses[rowIndex];
  const colStartStyle = colStartClasses[colIndex];

  return `${rowStartStyle} ${colStartStyle}`;
};
