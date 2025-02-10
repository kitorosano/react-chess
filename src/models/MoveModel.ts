import { pieceNotation, PieceType } from "../constants/piece-info";
import { CoordinateModel } from "./CoordinateModel";
import { PlayerColor } from "./PlayerModel";

export default class MoveModel {
  from: CoordinateModel;
  to: CoordinateModel;
  piece: PieceType;
  color: PlayerColor;
  hasCaptured: boolean;

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

  get toNotation(): string {
    if (this.hasCaptured) {
      return pieceNotation[this.piece] + "x" + this.to.getNotation();
    }
    return pieceNotation[this.piece] + this.to.getNotation();
  }
}
