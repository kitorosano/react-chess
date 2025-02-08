import BoardModel from "../models/BoardModel";
import { CoordinateModel } from "../models/CoordinateModel";
import { PieceType } from "../models/PieceModel";
import SquareModel from "../models/SquareModel";

interface MoveCheck {
  move: CoordinateModel | null;
  shouldBreak: boolean;
}

const checkValidMove = (
  board: BoardModel,
  square: SquareModel,
  targetCoordinate: CoordinateModel,
): MoveCheck => {
  const moveCheck: MoveCheck = {
    move: null,
    shouldBreak: false,
  };

  const targetSquare = board.getSquareOnCoordinate(targetCoordinate);

  if (targetSquare.piece) {
    if (!targetSquare.isPieceSameColor(square))
      moveCheck.move = targetCoordinate;
    moveCheck.shouldBreak = true;
  } else {
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
  updateRow?: boolean;
  updateColumn?: boolean;
}

const getRowAndColumnValidMoves = ({
  board,
  square,
  startPos,
  endPos,
  increment,
  updateRow,
  updateColumn,
}: GetRowColumnValidMovesProps): Array<CoordinateModel> => {
  const validMoves: Array<CoordinateModel> = [];

  for (
    let i = startPos;
    increment > 0 ? i <= endPos : i >= endPos;
    i += increment
  ) {
    const targetRow = updateRow ? i : square.row;
    const targetColumn = updateColumn ? i : square.column;
    const targetCoordinate = new CoordinateModel(targetRow, targetColumn);

    const possibleMove = checkValidMove(board, square, targetCoordinate);
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

  const validMoves: Array<CoordinateModel> = [];

  switch (square.piece.type) {
    case PieceType.PAWN: {
      const validPawnMoves = getValidPawnMoves(board, square);
      validMoves.push(...validPawnMoves);
      break;
    }
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

  return validMoves.filter(isMoveOutOfBounds).filter((move) => {
    return !isMoveSameSquare(move, square);
  });
};

const getValidPawnMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [];
  const row = square.row;
  const column = square.column;
  const isWhite = square.piece!.isWhite();

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

const getValidRookMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.column + 1,
      endPos: 7,
      increment: 1,
      updateColumn: true,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.column - 1,
      endPos: 0,
      increment: -1,
      updateColumn: true,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row + 1,
      endPos: 7,
      increment: 1,
      updateRow: true,
    }),
    ...getRowAndColumnValidMoves({
      board,
      square,
      startPos: square.row - 1,
      endPos: 0,
      increment: -1,
      updateRow: true,
    }),
  ];

  return validMoves;
};

const getValidKnightMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [];
  const row = square.row;
  const column = square.column;

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (Math.abs(i) + Math.abs(j) === 3) {
        validMoves.push(new CoordinateModel(row + i, column + j));
      }
    }
  }

  return validMoves;
};

const getValidBishopMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [];
  const row = square.row;
  const column = square.column;

  for (let i = 0; i <= 8; i++) {
    validMoves.push(new CoordinateModel(row + i, column + i));
    validMoves.push(new CoordinateModel(row - i, column - i));
    validMoves.push(new CoordinateModel(row + i, column - i));
    validMoves.push(new CoordinateModel(row - i, column + i));
  }

  return validMoves;
};

const getValidQueenMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [];

  validMoves.push(...getValidRookMoves(board, square));
  validMoves.push(...getValidBishopMoves(board, square));

  return validMoves;
};

const getValidKingMoves = (board: BoardModel, square: SquareModel) => {
  const validMoves: Array<CoordinateModel> = [];
  const row = square.row;
  const column = square.column;

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
