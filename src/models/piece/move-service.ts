import BoardModel from "../models/BoardModel";
import { CoordinateModel } from "../models/CoordinateModel";
import { PieceType } from "../models/piece/PieceModel";
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

const getRowAndColumnValidMoves = ({
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

  switch (square.piece.type) {
    case PieceType.ROOK: {
      const validRookMoves = getValidRookMoves(board, square);
      validMoves.push(...validRookMoves);
      break;
    }
    case PieceType.KNIGHT: {
      const validKnightMoves = getValidKnightMoves(board, square);
      validMoves.push(...validKnightMoves);
      break;
    }
    case PieceType.BISHOP: {
      const validBishopMoves = getValidBishopMoves(board, square);
      validMoves.push(...validBishopMoves);
      break;
    }
    case PieceType.QUEEN: {
      const validQueenMoves = getValidQueenMoves(board, square);
      validMoves.push(...validQueenMoves);
      break;
    }
    case PieceType.KING: {
      const validKingMoves = getValidKingMoves(board, square);
      validMoves.push(...validKingMoves);
      break;
    }
    default:
      break;
  }

  return validMoves.filter((move) => !!move).filter(isMoveOutOfBounds);
};

const getValidRookMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.column + 1,
      endPos: 7,
      increment: 1,
      rowIncrement: 0,
      columnIncrement: 1,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.column - 1,
      endPos: 0,
      increment: -1,
      rowIncrement: 0,
      columnIncrement: -1,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row + 1,
      endPos: 7,
      increment: 1,
      rowIncrement: 1,
      columnIncrement: 0,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row - 1,
      endPos: 0,
      increment: -1,
      rowIncrement: -1,
      columnIncrement: 0,
    }),
  ];

  return validMoves;
};

const getValidKnightMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel | null> = [];
  const row = square.row;
  const column = square.column;

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (Math.abs(i) + Math.abs(j) === 3) {
        const targetCoordinate = new CoordinateModel(row + i, column + j);
        validMoves.push(
          checkValidMove({ board, square, targetCoordinate }).move,
        );
      }
    }
  }

  return validMoves;
};

const getValidBishopMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row + 1,
      endPos: 7,
      increment: 1,
      rowIncrement: 1,
      columnIncrement: 1,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row + 1,
      endPos: 7,
      increment: 1,
      rowIncrement: 1,
      columnIncrement: -1,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row - 1,
      endPos: 0,
      increment: -1,
      rowIncrement: -1,
      columnIncrement: 1,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row - 1,
      endPos: 0,
      increment: -1,
      rowIncrement: -1,
      columnIncrement: -1,
    }),
  ];

  return validMoves;
};

const getValidQueenMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [];

  validMoves.push(...getValidRookMoves(board, square));
  validMoves.push(...getValidBishopMoves(board, square));

  return validMoves;
};

const getValidKingMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel | null> = [];

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const targetCoordinate = new CoordinateModel(
        square.row + i,
        square.column + j,
      );
      validMoves.push(checkValidMove({ board, square, targetCoordinate }).move);
    }
  }

  return validMoves;
};

const isMoveOutOfBounds = (move: CoordinateModel): boolean => {
  return move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8;
};
