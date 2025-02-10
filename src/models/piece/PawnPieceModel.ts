import { PieceType } from "../../constants/piece-info";
import { checkValidMove } from "../../services/move-service";
import BoardModel from "../BoardModel";
import { CoordinateModel } from "../CoordinateModel";
import { PlayerColor } from "../PlayerModel";
import SquareModel from "../SquareModel";
import PieceModel from "./PieceModel";

export default class PawnPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.PAWN, color);
  }

  getValidMoves = (
    board: BoardModel,
    square: SquareModel,
  ): Array<CoordinateModel | null> => {
    const validMoves: Array<CoordinateModel | null> = [];
    const { row, column } = square;
    const isWhite = square.piece!.isWhite();

    if (isWhite) {
      for (let i = -1; i <= 2; i++) {
        const isDiagonal = i !== 0;
        const targetCoordinate = new CoordinateModel(row + 1, column + i);
        validMoves.push(
          checkValidMove({
            board,
            square,
            targetCoordinate,
            blockIfOppositeColor: !isDiagonal,
            blockIfEmpty: isDiagonal,
          }).move,
        );
      }

      const isFirstMove = row === 1;
      if (isFirstMove) {
        const targetCoordinate = new CoordinateModel(row + 2, column);
        validMoves.push(
          checkValidMove({
            board,
            square,
            targetCoordinate,
            blockIfOppositeColor: true,
          }).move,
        );
      }
    } else {
      for (let i = -1; i <= 2; i++) {
        const isDiagonal = i !== 0;
        const targetCoordinate = new CoordinateModel(row - 1, column + i);
        validMoves.push(
          checkValidMove({
            board,
            square,
            targetCoordinate,
            blockIfOppositeColor: !isDiagonal,
            blockIfEmpty: isDiagonal,
          }).move,
        );
      }

      const isFirstMove = row === 6;
      if (isFirstMove) {
        const targetCoordinate = new CoordinateModel(row - 2, column);
        validMoves.push(
          checkValidMove({
            board,
            square,
            targetCoordinate,
            blockIfOppositeColor: true,
          }).move,
        );
      }
    }

    return validMoves;
  };
}
