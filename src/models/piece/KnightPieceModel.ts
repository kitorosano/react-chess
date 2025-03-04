import { PieceType } from "../../constants/piece-info";
import { checkValidMove } from "../../services/move-validation-service";
import BoardModel from "../BoardModel";
import MoveModel from "../MoveModel";
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
  ): Array<MoveModel | null> => {
    const validMoves: Array<MoveModel | null> = [];
    const row = square.row;
    const column = square.column;

    for (let i = -2; i < 3; i++) {
      for (let j = -2; j < 3; j++) {
        if (Math.abs(i) + Math.abs(j) === 3) {
          const targetMove = new MoveModel(row + i, column + j);
          validMoves.push(checkValidMove({ board, square, targetMove }).move);
        }
      }
    }

    return validMoves;
  };
}
