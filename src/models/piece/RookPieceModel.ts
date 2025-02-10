import { BOARD_COLUMNS, BOARD_ROWS } from "../../constants/board-info";
import { PieceType } from "../../constants/piece-info";
import { getRowAndColumnValidMoves } from "../../services/move-service";
import BoardModel from "../BoardModel";
import MoveModel from "../MoveModel";
import { PlayerColor } from "../PlayerModel";
import SquareModel from "../SquareModel";
import PieceModel from "./PieceModel";

export default class RookPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.ROOK, color);
  }
  getValidMoves = (
    board: BoardModel,
    square: SquareModel,
  ): Array<MoveModel | null> => {
    const validMoves: Array<MoveModel> = [
      ...getRowAndColumnValidMoves({
        board,
        square,
        startPos: square.column + 1,
        endPos: BOARD_COLUMNS - 1,
        increment: 1,
        rowIncrement: 0,
        columnIncrement: 1,
      }),
      ...getRowAndColumnValidMoves({
        board,
        square,
        startPos: square.column - 1,
        endPos: 0,
        increment: -1,
        rowIncrement: 0,
        columnIncrement: -1,
      }),
      ...getRowAndColumnValidMoves({
        board,
        square,
        startPos: square.row + 1,
        endPos: BOARD_ROWS - 1,
        increment: 1,
        rowIncrement: 1,
        columnIncrement: 0,
      }),
      ...getRowAndColumnValidMoves({
        board,
        square,
        startPos: square.row - 1,
        endPos: 0,
        increment: -1,
        rowIncrement: -1,
        columnIncrement: 0,
      }),
    ];

    return validMoves;
  };
}
