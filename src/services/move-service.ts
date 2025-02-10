import { BOARD_COLUMNS, BOARD_ROWS } from "../constants/board-info";
import BoardModel from "../models/BoardModel";
import MoveHistoryModel from "../models/MoveHistoryModel";
import MoveModel from "../models/MoveModel";
import SquareModel from "../models/SquareModel";

interface CheckValidMove {
  board: BoardModel;
  square: SquareModel;
  targetMove: MoveModel;
  blockIfOppositeColor?: boolean;
  blockIfEmpty?: boolean;
}
interface MoveCheck {
  move: MoveModel | null;
  shouldBreak: boolean;
}

export const checkValidMove = ({
  board,
  square,
  targetMove,
  blockIfOppositeColor = false,
  blockIfEmpty = false,
}: CheckValidMove): MoveCheck => {
  const moveCheck: MoveCheck = {
    move: null,
    shouldBreak: false,
  };

  const targetSquare = board.getSquareOnCoordinate(targetMove);

  if (targetSquare?.piece) {
    if (!targetSquare.isPieceSameColor(square) && !blockIfOppositeColor)
      moveCheck.move = targetMove;
    moveCheck.shouldBreak = true;
  } else if (!blockIfEmpty) {
    moveCheck.move = targetMove;
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
}: GetRowColumnValidMovesProps): Array<MoveModel> => {
  const validMoves: Array<MoveModel> = [];

  for (
    let i = startPos;
    increment > 0 ? i <= endPos : i >= endPos;
    i += increment
  ) {
    const count = Math.abs(i - startPos) + 1;
    const targetRow = square.row + count * rowIncrement;
    const targetColumn = square.column + count * columnIncrement;
    const targetMove = new MoveModel(targetRow, targetColumn);

    const possibleMove = checkValidMove({
      board,
      square,
      targetMove: targetMove,
    });
    if (possibleMove.move) validMoves.push(possibleMove.move);
    if (possibleMove.shouldBreak) break;
  }

  return validMoves;
};

export const getValidMoves = (
  board: BoardModel,
  square: SquareModel | null,
  lastMove: MoveHistoryModel | null,
): Array<MoveModel> => {
  if (!square || !square.piece) return [];

  const validMoves = square.piece.getValidMoves(board, square, lastMove);

  return validMoves.filter(doesMoveExists).filter(isMoveOutOfBounds);
};

const doesMoveExists = (move: MoveModel | null) => !!move;
const isMoveOutOfBounds = (move: MoveModel): boolean => {
  return (
    move.row >= 0 &&
    move.row < BOARD_ROWS &&
    move.column >= 0 &&
    move.column < BOARD_COLUMNS
  );
};
