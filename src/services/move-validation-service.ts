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
  mustBeEmptyCoordinates?: Array<CoordinateModel>;
  // For castling
  mustBeNotMovedRook?: CoordinateModel;
}
interface RowColumnValidMoveCheck {
  startPos: number;
  endPos: number;
  increment: number;
  rowIncrement: number;
  columnIncrement: number;
}

export interface PossibleMove {
  blockVerifyCheck?: boolean;
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
      // allValidMoves.push(...getValidMoves(board, square, null));
    }
  });

  return allValidMoves;
};

const isInCheck = (
  board: BoardModel,
  square: SquareModel,
  move: MoveModel | null,
): boolean => {
  if (!move) return false;

  const newBoard = board.clone();
  const targetSquare = newBoard.getSquareOnCoordinate(move);

  if (!targetSquare) return false;

  newBoard.movePiece(square, targetSquare);

  const oponentColor = square.piece?.isWhite()
    ? PlayerColor.BLACK
    : PlayerColor.WHITE;
  const allOponentValidMoves: Array<MoveModel> = getAllValidMovesForPlayer(
    board,
    oponentColor,
  );

  if (allOponentValidMoves.some((move) => move.givesCheck)) return true;

  return false;
};

export const checkValidMove = ({
  board,
  square,
  possibleMove,
}: CheckValidMove): MoveCheck => {
  const moveCheck: MoveCheck = {
    move: null,
    shouldBreak: false,
  };

  const { blockVerifyCheck, singleConfig } = possibleMove;
  if (!singleConfig) return moveCheck;

  const { blockIfOppositeColor, blockIfEmpty, targetCoordinates, moveType } =
    singleConfig;

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

  if (!blockVerifyCheck && isInCheck(board, square, moveCheck.move)) {
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

  if (!possibleMove.rowColumnConfig) return validMoves;

  const { startPos, endPos, increment, rowIncrement, columnIncrement } =
    possibleMove.rowColumnConfig;

  for (
    let i = startPos;
    increment > 0 ? i <= endPos : i >= endPos;
    i += increment
  ) {
    const count = Math.abs(i - startPos) + 1;

    const possibleRow = square.row + count * rowIncrement;
    const possibleColumn = square.column + count * columnIncrement;

    const newPossibleMove = {
      blockVerifyCheck: true,
      singleConfig: {
        targetCoordinates: new CoordinateModel(possibleRow, possibleColumn),
        moveType: MoveType.NORMAL,
      },
    };

    const validatedMove = checkValidMove({
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
): Array<MoveModel> => {
  if (!square || !square.piece) return [];

  const possibleMoves: Array<PossibleMove> = square.piece.getMoves(
    square.coordinates,
    lastMove,
  );

  const validMoves: Array<MoveModel | null> = [];
  possibleMoves.forEach((possibleMove) => {
    if (possibleMove.singleConfig) {
      validMoves.push(checkValidMove({ board, square, possibleMove }).move);
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
