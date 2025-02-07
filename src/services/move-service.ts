import { CoordinateModel } from "../models/CoordinateModel";
import { PieceType } from "../models/PieceModel";
import SquareModel from "../models/SquareModel";

export const getValidMoves = (
  square: SquareModel | null,
): Array<CoordinateModel> => {
  if (!square || !square.piece) return [];

  const validMoves: Array<CoordinateModel> = [];
  const { row, column } = square.coordinates;

  switch (square.piece.type) {
    case PieceType.PAWN: {
      const isWhite = square.piece.isWhite();
      const validPawnMoves = getValidPawnMoves(row, column, isWhite);
      validMoves.push(...validPawnMoves);
      break;
    }
    case PieceType.ROOK: {
      const validRookMoves = getValidRookMoves(row, column);
      validMoves.push(...validRookMoves);
      break;
    }
    case PieceType.KNIGHT: {
      const validKnightMoves = getValidKnightMoves(row, column);
      validMoves.push(...validKnightMoves);
      break;
    }
    case PieceType.BISHOP: {
      const validBishopMoves = getValidBishopMoves(row, column);
      validMoves.push(...validBishopMoves);
      break;
    }
    case PieceType.QUEEN: {
      const validQueenMoves = getValidQueenMoves(row, column);
      validMoves.push(...validQueenMoves);
      break;
    }
    case PieceType.KING: {
      const validKingMoves = getValidKingMoves(row, column);
      validMoves.push(...validKingMoves);
      break;
    }
    default:
      break;
  }

  return validMoves.filter(isMoveOutOfBounds).filter((move) => {
    return !isMoveSameSquare(move, square);
  });
};

const getValidPawnMoves = (row: number, column: number, isWhite: boolean) => {
  const validMoves: Array<CoordinateModel> = [];

  if (isWhite) {
    validMoves.push(new CoordinateModel(row + 1, column));
    const isFirstMove = row === 1;

    if (isFirstMove) validMoves.push(new CoordinateModel(row + 2, column));
  } else {
    validMoves.push(new CoordinateModel(row - 1, column));

    const isFirstMove = row === 6;
    if (isFirstMove) validMoves.push(new CoordinateModel(row - 2, column));
  }

  return validMoves;
};

const getValidRookMoves = (row: number, column: number) => {
  const validMoves: Array<CoordinateModel> = [];

  for (let i = 0; i < 8; i++) {
    validMoves.push(new CoordinateModel(row, i));
    validMoves.push(new CoordinateModel(i, column));
  }

  return validMoves;
};

const getValidKnightMoves = (row: number, column: number) => {
  const validMoves: Array<CoordinateModel> = [];

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (Math.abs(i) + Math.abs(j) === 3) {
        validMoves.push(new CoordinateModel(row + i, column + j));
      }
    }
  }

  return validMoves;
};

const getValidBishopMoves = (row: number, column: number) => {
  const validMoves: Array<CoordinateModel> = [];

  for (let i = 0; i < 8; i++) {
    validMoves.push(new CoordinateModel(row + i, column + i));
    validMoves.push(new CoordinateModel(row - i, column - i));
    validMoves.push(new CoordinateModel(row + i, column - i));
    validMoves.push(new CoordinateModel(row - i, column + i));
  }

  return validMoves;
};

const getValidQueenMoves = (row: number, column: number) => {
  const validMoves: Array<CoordinateModel> = [];

  validMoves.push(...getValidRookMoves(row, column));
  validMoves.push(...getValidBishopMoves(row, column));

  return validMoves;
};

const getValidKingMoves = (row: number, column: number) => {
  const validMoves: Array<CoordinateModel> = [];

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      validMoves.push(new CoordinateModel(row + i, column + j));
    }
  }

  return validMoves;
};

const isMoveOutOfBounds = (move: CoordinateModel): boolean => {
  return move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8;
};

const isMoveSameSquare = (
  move: CoordinateModel,
  square: SquareModel,
): boolean => {
  return move.row === square.row && move.column === square.column;
};
