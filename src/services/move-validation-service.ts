import { BOARD_COLUMNS, BOARD_ROWS } from "../constants/board-info";
import BoardModel from "../models/BoardModel";
import { CoordinateModel } from "../models/CoordinateModel";
import MoveHistoryModel from "../models/MoveHistoryModel";
import MoveModel, { MoveType } from "../models/MoveModel";
import { PlayerColor } from "../models/PlayerModel";
import SquareModel from "../models/SquareModel";

interface SingleValidMoveCheck {
  targetCoordinates: CoordinateModel;
  blockIfOppositeColor?: boolean;
  blockIfEmpty?: boolean;
  moveType?: MoveType;
  blockIfCoordinatesAreOccupied?: Array<CoordinateModel>;
  blockIfPiecesOnCoordinatesHasMoved?: Array<CoordinateModel>;
  blockIfCoordinatesPutsInCheck?: Array<CoordinateModel>;
}
interface RowColumnValidMoveCheck {
  startPos: number;
  endPos: number;
  increment: number;
  rowIncrement: number;
  columnIncrement: number;
}

export interface PossibleMove {
  dontVerifyCheck?: boolean;
  mustNotBeInCheck?: boolean;
  singleConfig?: SingleValidMoveCheck;
  rowColumnConfig?: RowColumnValidMoveCheck;
}

interface CheckValidMove {
  board: BoardModel;
  square: SquareModel;
  possibleMove: PossibleMove;
}
type MoveCheck = {
  move: MoveModel | null;
  shouldBreak: boolean;
};

interface GetRowColumnValidMovesProps {
  board: BoardModel;
  square: SquareModel;
  possibleMove: PossibleMove;
}

const getAllValidMovesForPlayer = (
  board: BoardModel,
  playerColor: PlayerColor,
): Array<MoveModel> => {
  const allValidMoves: Array<MoveModel> = [];

  board.squares.forEach((square) => {
    if (square.piece && square.piece.color === playerColor) {
      allValidMoves.push(...getValidMoves(board, square, null, true));
    }
  });

  return allValidMoves;
};

const wouldMovePutInCheck = (
  board: BoardModel,
  square: SquareModel,
  move: MoveModel | null,
): boolean => {
  const newBoard = board.clone();

  if (move) {
    const targetSquare = newBoard.getSquareOnCoordinate(move);
    if (!targetSquare) return false;

    newBoard.movePiece(square, targetSquare);
  }

  const oponentColor = square.piece?.isWhite()
    ? PlayerColor.BLACK
    : PlayerColor.WHITE;
  const allOponentValidMoves: Array<MoveModel> = getAllValidMovesForPlayer(
    newBoard,
    oponentColor,
  );

  return allOponentValidMoves.some((move) => move.givesCheck);
};

export const validateSpecialMove = (
  board: BoardModel,
  square: SquareModel,
  possibleMove: PossibleMove,
  targetMove: MoveModel,
): boolean => {
  const { dontVerifyCheck, mustNotBeInCheck, singleConfig } = possibleMove;
  if (!singleConfig) return true;

  const {
    blockIfPiecesOnCoordinatesHasMoved,
    blockIfCoordinatesAreOccupied,
    blockIfCoordinatesPutsInCheck,
  } = singleConfig;
  let isValid = true;

  if (!dontVerifyCheck) {
    if (wouldMovePutInCheck(board, square, targetMove)) isValid = false;

    if (mustNotBeInCheck && wouldMovePutInCheck(board, square, null))
      isValid = false;

    if (blockIfCoordinatesPutsInCheck?.length) {
      const somePutsInCheck = blockIfCoordinatesPutsInCheck.some(
        ({ row, column }) => {
          const move = new MoveModel(row, column, MoveType.NORMAL);
          return wouldMovePutInCheck(board, square, move);
        },
      );
      if (somePutsInCheck) isValid = false;
    }
  }
  if (blockIfCoordinatesAreOccupied?.length) {
    const someSquareIsOccupied = blockIfCoordinatesAreOccupied.some(
      (coordinate) => {
        const square = board.getSquareOnCoordinate(coordinate);
        return square?.piece;
      },
    );
    if (someSquareIsOccupied) isValid = false;
  }
  if (blockIfPiecesOnCoordinatesHasMoved?.length) {
    const someEmptySquareOrPieceHasMoved =
      blockIfPiecesOnCoordinatesHasMoved.some((coordinate) => {
        const square = board.getSquareOnCoordinate(coordinate);
        return isEmptySquareOrPieceHasMoved(square);
      });
    if (someEmptySquareOrPieceHasMoved) isValid = false;
  }

  return isValid;
};

export const validateMove = ({
  board,
  square,
  possibleMove,
}: CheckValidMove): MoveCheck => {
  const moveCheck: MoveCheck = {
    move: null,
    shouldBreak: false,
  };

  if (!possibleMove.singleConfig) return moveCheck;

  const { blockIfOppositeColor, blockIfEmpty, targetCoordinates, moveType } =
    possibleMove.singleConfig;

  const targetSquare = board.getSquareOnCoordinate(targetCoordinates);
  const targetMove = new MoveModel(
    targetCoordinates.row,
    targetCoordinates.column,
    moveType,
  );

  if (targetSquare?.piece) {
    if (!targetSquare.isPieceSameColor(square) && !blockIfOppositeColor) {
      moveCheck.move = targetMove;
      moveCheck.move.givesCheck = targetSquare.piece.isKing();
    }
    moveCheck.shouldBreak = true;
  } else if (!blockIfEmpty) {
    moveCheck.move = targetMove;
  }

  if (!validateSpecialMove(board, square, possibleMove, targetMove)) {
    moveCheck.move = null;
  }

  return moveCheck;
};

export const getRowAndColumnValidMoves = ({
  board,
  square,
  possibleMove,
}: GetRowColumnValidMovesProps): Array<MoveModel> => {
  const validMoves: Array<MoveModel> = [];

  const { dontVerifyCheck: dontVerifyCheck, rowColumnConfig } = possibleMove;
  if (!rowColumnConfig) return validMoves;

  const { startPos, endPos, increment, rowIncrement, columnIncrement } =
    rowColumnConfig;

  for (
    let i = startPos;
    increment > 0 ? i <= endPos : i >= endPos;
    i += increment
  ) {
    const count = Math.abs(i - startPos) + 1;

    const possibleRow = square.row + count * rowIncrement;
    const possibleColumn = square.column + count * columnIncrement;

    const newPossibleMove = {
      dontVerifyCheck,
      singleConfig: {
        targetCoordinates: new CoordinateModel(possibleRow, possibleColumn),
        moveType: MoveType.NORMAL,
      },
    };

    const validatedMove = validateMove({
      board,
      square,
      possibleMove: newPossibleMove,
    });
    if (validatedMove.move) validMoves.push(validatedMove.move);
    if (validatedMove.shouldBreak) break;
  }

  return validMoves;
};

export const getValidMoves = (
  board: BoardModel,
  square: SquareModel | null,
  lastMove: MoveHistoryModel | null,
  dontVerifyCheck = false,
): Array<MoveModel> => {
  if (!square || !square.piece) return [];

  const possibleMoves: Array<PossibleMove> = square.piece.getMoves(
    square.coordinates,
    lastMove,
  );

  const validMoves: Array<MoveModel | null> = [];
  possibleMoves.forEach((possibleMove) => {
    possibleMove.dontVerifyCheck = dontVerifyCheck;
    if (possibleMove.singleConfig) {
      validMoves.push(validateMove({ board, square, possibleMove }).move);
    }
    if (possibleMove.rowColumnConfig) {
      validMoves.push(
        ...getRowAndColumnValidMoves({ board, square, possibleMove }),
      );
    }
  });

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
const isEmptySquareOrPieceHasMoved = (square: SquareModel | null): boolean => {
  if (!square || !square.piece) return true;
  return square.piece.hasMoved;
};
