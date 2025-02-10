import BoardModel from "../BoardModel";
import { CoordinateModel } from "../CoordinateModel";
import SquareModel from "../SquareModel";
import { checkValidMove } from "./move-service";
import PieceModel from "./PieceModel";

export default class KingPieceModel extends PieceModel {
  getValidMoves = (
    board: BoardModel,
    square: SquareModel,
  ): Array<CoordinateModel | null> => {
    const validMoves: Array<CoordinateModel | null> = [];

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const targetCoordinate = new CoordinateModel(
          square.row + i,
          square.column + j,
        );
        validMoves.push(
          checkValidMove({ board, square, targetCoordinate }).move,
        );
      }
    }

    return validMoves;
  };
}
