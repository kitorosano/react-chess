import {
  BLACK_PAWN_ROW,
  BLACK_ROW_FOR_EN_PASSANT,
  WHITE_PAWN_ROW,
  WHITE_ROW_FOR_EN_PASSANT,
} from "../../constants/initial-piece-positions";
import { PieceType } from "../../constants/piece-info";
import { checkValidMove } from "../../services/move-service";
import BoardModel from "../BoardModel";
import MoveHistoryModel from "../MoveHistoryModel";
import MoveModel, { MoveType } from "../MoveModel";
import { PlayerColor } from "../PlayerModel";
import SquareModel from "../SquareModel";
import PieceModel from "./PieceModel";

export default class PawnPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.PAWN, color);
  }

  getValidMoves = (
    board: BoardModel,
    square: SquareModel,
    lastMove: MoveHistoryModel | null,
  ): Array<MoveModel | null> => {
    const validMoves: Array<MoveModel | null> = [];
    const { row, column } = square;
    const isWhite = square.piece!.isWhite();
    const targetMoveRow = isWhite ? row + 1 : row - 1;
    const targetFirstMoveRow = isWhite ? row + 2 : row - 2;
    const isFirstMove = isWhite
      ? row === WHITE_PAWN_ROW
      : row === BLACK_PAWN_ROW;

    let cannotDoubleMoveForward = false;

    for (let i = -1; i <= 2; i++) {
      const isForwardMove = i === 0;
      const targetMove = new MoveModel(targetMoveRow, column + i);
      const possibleMove = checkValidMove({
        board,
        square,
        targetMove,
        blockIfOppositeColor: isForwardMove,
        blockIfEmpty: !isForwardMove,
      });
      if (isForwardMove && possibleMove.shouldBreak)
        cannotDoubleMoveForward = true;
      validMoves.push(possibleMove.move);
    }

    if (isFirstMove && !cannotDoubleMoveForward) {
      const targetMove = new MoveModel(targetFirstMoveRow, column);
      validMoves.push(
        checkValidMove({
          board,
          square,
          targetMove,
          blockIfOppositeColor: true,
        }).move,
      );
    }

    if (!lastMove) return validMoves;

    // En passant
    if (this.canEnPassant(square, lastMove)) {
      const targetMove = new MoveModel(
        targetMoveRow,
        lastMove.to.column,
        MoveType.EN_PASSANT,
      );
      validMoves.push(
        checkValidMove({
          board,
          square,
          targetMove,
          blockIfOppositeColor: true,
        }).move,
      );
    }

    return validMoves;
  };

  canEnPassant = (square: SquareModel, lastMove: MoveHistoryModel): boolean => {
    const { row: currentRow, column: currentColumn } = square;
    const { row: targetRow, column: targetColumn } = lastMove.to;
    const isWhite = square.piece!.isWhite();
    const rowForEnPassant = isWhite
      ? WHITE_ROW_FOR_EN_PASSANT
      : BLACK_ROW_FOR_EN_PASSANT;
    const isRowForEnPassant = currentRow === rowForEnPassant;
    const pieceIsPawn = lastMove.piece === PieceType.PAWN;
    const isOppositeColor = square.piece?.color !== lastMove.color;

    return (
      isRowForEnPassant &&
      pieceIsPawn &&
      isOppositeColor &&
      targetRow === rowForEnPassant &&
      (targetColumn === currentColumn + 1 || targetColumn === currentColumn - 1)
    );
  };
}
