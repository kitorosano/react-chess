import { PieceType } from "../constants/piece-info";
import { CoordinateModel } from "./CoordinateModel";
import { PlayerColor } from "./PlayerModel";

export default class MoveModel {
  from: CoordinateModel;
  to: CoordinateModel;
  piece: PieceType;
  color: PlayerColor;

  constructor(
    from: CoordinateModel,
    to: CoordinateModel,
    piece: PieceType,
    color: PlayerColor,
  ) {
    this.from = from;
    this.to = to;
    this.piece = piece;
    this.color = color;
  }
}
