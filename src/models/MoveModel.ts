import { CoordinateModel } from "./CoordinateModel";

export enum MoveType {
  NORMAL = "NORMAL",
  CASTLE_KING_SIDE = "CASTLE_KING_SIDE",
  CASTLE_QUEEN_SIDE = "CASTLE_QUEEN_SIDE ",
  EN_PASSANT = "EN_PASSANT",
  PROMOTION = "PROMOTION",
}

export default class MoveModel extends CoordinateModel {
  type: MoveType;

  constructor(row: number, column: number, type: MoveType = MoveType.NORMAL) {
    super(row, column);
    this.type = type;
  }
}
