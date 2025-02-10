import { pieceNotation, PieceType } from "../constants/piece-info";
import { columnNotation } from "../constants/square-info";
import { CoordinateModel } from "./CoordinateModel";
import { PlayerColor } from "./PlayerModel";

export enum MoveType {
  NORMAL = "NORMAL",
  CASTLE_KING_SIDE = "CASTLE_KING_SIDE",
  CASTLE_QUEEN_SIDE = "CASTLE_QUEEN_SIDE ",
  EN_PASSANT = "EN_PASSANT",
  PROMOTION = "PROMOTION",
}

export default class MoveHistoryModel {
  from: CoordinateModel;
  to: CoordinateModel;
  piece: PieceType;
  color: PlayerColor;
  hasCaptured: boolean;
  type: MoveType = MoveType.NORMAL;

  constructor(
    from: CoordinateModel,
    to: CoordinateModel,
    piece: PieceType,
    color: PlayerColor,
    hasCaptured: boolean = false,
  ) {
    this.from = from;
    this.to = to;
    this.piece = piece;
    this.color = color;
    this.hasCaptured = hasCaptured;
  }

  get notation(): string {
    const { column, row } = this.to;
    if (this.hasCaptured) {
      return (
        pieceNotation[this.piece] + "x" + columnNotation[column] + (row + 1)
      );
    }
    return pieceNotation[this.piece] + columnNotation[column] + (row + 1);
  }
}
