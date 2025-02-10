import BoardModel from "../models/BoardModel";
import { CoordinateModel } from "../models/CoordinateModel";
import SquareModel from "../models/SquareModel";

interface CheckValidMove {
  board: BoardModel;
  square: SquareModel;
  targetCoordinate: CoordinateModel;
  blockIfOppositeColor?: boolean;
  blockIfEmpty?: boolean;
}
interface MoveCheck {
  move: CoordinateModel | null;
  shouldBreak: boolean;
}

export const checkValidMove = ({
  board,
  square,
  targetCoordinate,
  blockIfOppositeColor = false,
  blockIfEmpty = false,
}: CheckValidMove): MoveCheck => {
  const moveCheck: MoveCheck = {
    move: null,
    shouldBreak: false,
  };

  const targetSquare = board.getSquareOnCoordinate(targetCoordinate);

  if (targetSquare?.piece) {
    if (!targetSquare.isPieceSameColor(square) && !blockIfOppositeColor)
      moveCheck.move = targetCoordinate;
    moveCheck.shouldBreak = true;
  } else if (!blockIfEmpty) {
    moveCheck.move = targetCoordinate;
  }

  return moveCheck;
};

interface GetRowColumnValidMovesProps {
  board: BoardModel;
  square: SquareModel;
  startPos: number;
  endPos: number;
  increment: number;
  rowIncrement: number;
  columnIncrement: number;
}

export const getRowAndColumnValidMoves = ({
  board,
  square,
  startPos,
  endPos,
  increment,
  rowIncrement,
  columnIncrement,
}: GetRowColumnValidMovesProps): Array<CoordinateModel> => {
  const validMoves: Array<CoordinateModel> = [];

  for (
    let i = startPos;
    increment > 0 ? i <= endPos : i >= endPos;
    i += increment
  ) {
    const count = Math.abs(i - startPos) + 1;
    const targetRow = square.row + count * rowIncrement;
    const targetColumn = square.column + count * columnIncrement;
    const targetCoordinate = new CoordinateModel(targetRow, targetColumn);

    const possibleMove = checkValidMove({ board, square, targetCoordinate });
    if (possibleMove.move) validMoves.push(possibleMove.move);
    if (possibleMove.shouldBreak) break;
  }

  return validMoves;
};

export const getValidMoves = (
  board: BoardModel,
  square: SquareModel | null,
): Array<CoordinateModel> => {
  if (!square || !square.piece) return [];

  const validMoves = square.piece.getValidMoves(board, square);

  return validMoves.filter(doesMoveExists).filter(isMoveOutOfBounds);
};

const doesMoveExists = (move: CoordinateModel | null) => !!move;
const isMoveOutOfBounds = (move: CoordinateModel): boolean => {
  return move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8;
};
