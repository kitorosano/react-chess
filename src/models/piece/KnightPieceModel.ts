import { PieceType } from "../../constants/piece-info";
import { checkValidMove } from "../../services/move-service";
import BoardModel from "../BoardModel";
import { CoordinateModel } from "../CoordinateModel";
import { PlayerColor } from "../PlayerModel";
import SquareModel from "../SquareModel";
import PieceModel from "./PieceModel";

export default class KnightPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.KNIGHT, color);
  }
  getValidMoves = (
    board: BoardModel,
    square: SquareModel,
  ): Array<CoordinateModel | null> => {
    const validMoves: Array<CoordinateModel | null> = [];
    const row = square.row;
    const column = square.column;

    for (let i = -2; i < 3; i++) {
      for (let j = -2; j < 3; j++) {
        if (Math.abs(i) + Math.abs(j) === 3) {
          const targetCoordinate = new CoordinateModel(row + i, column + j);
          validMoves.push(
            checkValidMove({ board, square, targetCoordinate }).move,
          );
        }
      }
    }

    return validMoves;
  };
}
