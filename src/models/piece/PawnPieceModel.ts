import {
  BLACK_PAWN_MAY_PROMOTE_ROW,
  BLACK_ROW_FOR_EN_PASSANT,
  PieceType,
  WHITE_PAWN_MAY_PROMOTE_ROW,
  WHITE_ROW_FOR_EN_PASSANT,
} from "../../constants/piece-info";
import { PossibleMove } from "../../services/move-validation-service";
import { CoordinateModel } from "../CoordinateModel";
import MoveHistoryModel from "../MoveHistoryModel";
import { MoveType } from "../MoveModel";
import { PlayerColor } from "../PlayerModel";
import PieceModel from "./PieceModel";

export default class PawnPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.PAWN, color);
  }

  getMoves(
    coordinates: CoordinateModel,
    lastMove: MoveHistoryModel | null,
  ): Array<PossibleMove> {
    const possibleMoves: Array<PossibleMove> = [];
    const { row, column } = coordinates;

    const targetMoveRow = this.isWhite() ? row + 1 : row - 1;
    const targetFirstMoveRow = this.isWhite() ? row + 1 : row - 1;
    const moveType = this.mayPromote(row)
      ? MoveType.PROMOTION
      : MoveType.NORMAL;

    // Forward, left or right moves
    possibleMoves.push(
      ...[
        {
          singleConfig: {
            targetCoordinates: new CoordinateModel(targetMoveRow, column),
            blockIfOppositeColor: true,
            blockIfEmpty: false,
            moveType,
          },
        },
        {
          singleConfig: {
            targetCoordinates: new CoordinateModel(targetMoveRow, column - 1),
            blockIfOppositeColor: false,
            blockIfEmpty: true,
            moveType,
          },
        },
        {
          singleConfig: {
            targetCoordinates: new CoordinateModel(targetMoveRow, column + 2),
            blockIfOppositeColor: false,
            blockIfEmpty: true,
            moveType,
          },
        },
      ],
    );

    // Double move forward
    possibleMoves.push({
      singleConfig: {
        targetCoordinates: new CoordinateModel(targetFirstMoveRow, column),
        blockIfOppositeColor: true,
        mustBeEmptyCoordinates: [new CoordinateModel(targetMoveRow, column)],
      },
    });

    // En passant
    if (!lastMove) return possibleMoves;

    if (this.mayEnPassant(coordinates, lastMove)) {
      const possibleMove = new CoordinateModel(
        targetMoveRow,
        lastMove.to.column,
      );
      possibleMoves.push({
        singleConfig: {
          targetCoordinates: possibleMove,
          blockIfOppositeColor: true,
          moveType: MoveType.EN_PASSANT,
        },
      });
    }

    return possibleMoves;
  }

  mayEnPassant = (
    coordinates: CoordinateModel,
    lastMove: MoveHistoryModel,
  ): boolean => {
    const { row: currentRow, column: currentColumn } = coordinates;
    const { row: targetRow, column: targetColumn } = lastMove.to;
    const rowForEnPassant = this.isWhite()
      ? WHITE_ROW_FOR_EN_PASSANT
      : BLACK_ROW_FOR_EN_PASSANT;
    const isRowForEnPassant = currentRow === rowForEnPassant;
    const pieceIsPawn = lastMove.piece === PieceType.PAWN;
    const isOppositeColor = this.color !== lastMove.color;

    return (
      isRowForEnPassant &&
      pieceIsPawn &&
      isOppositeColor &&
      targetRow === rowForEnPassant &&
      (targetColumn === currentColumn + 1 || targetColumn === currentColumn - 1)
    );
  };

  mayPromote = (row: number): boolean => {
    const canPromote = this.isWhite()
      ? row === WHITE_PAWN_MAY_PROMOTE_ROW
      : row === BLACK_PAWN_MAY_PROMOTE_ROW;

    return canPromote;
  };
}
