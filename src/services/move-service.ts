import { CoordinateModel } from "../models/CoordinateModel";
import SquareModel from "../models/SquareModel";

export const getValidMoves = (
  square: SquareModel | null,
): Array<CoordinateModel> => {
  if (!square || !square.piece) return [];

  const validMoves: Array<CoordinateModel> = [];
  const { row, column } = square.coordinates;

  if (square.piece.isPawn()) {
    if (square.piece.isWhite()) {
      validMoves.push(new CoordinateModel(row + 1, column));
      const isFirstMove = row === 1;

      if (isFirstMove) validMoves.push(new CoordinateModel(row + 2, column));
    } else {
      validMoves.push(new CoordinateModel(row - 1, column));

      const isFirstMove = row === 6;
      if (isFirstMove) validMoves.push(new CoordinateModel(row - 2, column));
    }
  }

  return validMoves;
  // return board.squares
  //   .filter((square) => !square.isEquals(selectedSquare))
  //   .map((square) => square.coordinates);
};
