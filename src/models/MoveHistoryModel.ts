import { pieceNotation, PieceType } from "../constants/piece-info";
import { columnNotation } from "../constants/square-info";
import { CoordinateModel } from "./CoordinateModel";
import { MoveType } from "./MoveModel";
import { PlayerColor } from "./PlayerModel";

export default class MoveHistoryModel {
  from: CoordinateModel;
  to: CoordinateModel;
  piece: PieceType;
  color: PlayerColor;
  hasCaptured: boolean;
  type: MoveType;

  constructor(
    from: CoordinateModel,
    to: CoordinateModel,
    piece: PieceType,
    color: PlayerColor,
    hasCaptured: boolean = false,
    type: MoveType,
  ) {
    this.from = from;
    this.to = to;
    this.piece = piece;
    this.color = color;
    this.hasCaptured = hasCaptured;
    this.type = type;
  }

  get notation(): string {
    if (this.type === MoveType.CASTLE_KING_SIDE) {
      return "O-O";
    }
    if (this.type === MoveType.CASTLE_QUEEN_SIDE) {
      return "O-O-O";
    }

    const { column, row } = this.to;
    if (this.hasCaptured) {
      return (
        pieceNotation[this.piece] + "x" + columnNotation[column] + (row + 1)
      );
    }
    return pieceNotation[this.piece] + columnNotation[column] + (row + 1);
  }
}
