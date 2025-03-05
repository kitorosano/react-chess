import { PieceType } from "../../constants/piece-info";
import { PossibleMove } from "../../services/move-validation-service";
import { CoordinateModel } from "../CoordinateModel";
import { PlayerColor } from "../PlayerModel";
import PieceModel from "./PieceModel";

export default class KnightPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.KNIGHT, color);
  }

  getMoves(coordinates: CoordinateModel): Array<PossibleMove> {
    const possibleMoves: Array<PossibleMove> = [];
    const { row, column } = coordinates;

    for (let i = -2; i < 3; i++) {
      for (let j = -2; j < 3; j++) {
        if (Math.abs(i) + Math.abs(j) === 3) {
          const possibleMove = new CoordinateModel(row + i, column + j);
          possibleMoves.push({
            singleConfig: { targetCoordinates: possibleMove },
          });
        }
      }
    }

    return possibleMoves;
  }
}
