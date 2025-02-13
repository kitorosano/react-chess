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
  promotedTo?: PieceType;
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

    if (this.type === MoveType.PROMOTION && this.promotedTo) {
      return this.baseNotation + this.promotedNotation;
    }

    return this.baseNotation;
  }

  get baseNotation(): string {
    const { column, row } = this.to;
    return (
      pieceNotation[this.piece] +
      this.capturedNotation +
      columnNotation[column] +
      (row + 1)
    );
  }

  get capturedNotation(): string {
    return this.hasCaptured ? "x" : "";
  }

  get promotedNotation(): string {
    return this.promotedTo ? `=${pieceNotation[this.promotedTo]}+` : "";
  }
}
