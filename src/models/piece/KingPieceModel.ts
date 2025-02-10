import { PieceType } from "../../constants/piece-info";
import { checkValidMove } from "../../services/move-service";
import BoardModel from "../BoardModel";
import { CoordinateModel } from "../CoordinateModel";
import { PlayerColor } from "../PlayerModel";
import SquareModel from "../SquareModel";
import PieceModel from "./PieceModel";

export default class KingPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.KING, color);
  }
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

    // Check for castling
    if (this.hasMoved) return validMoves;

    const kingRow = this.isWhite() ? 0 : 7;
    if (this.canKingSideCastle(board, kingRow)) {
      validMoves.push(new CoordinateModel(kingRow, 6));
    }
    if (this.canQueenSideCastle(board, kingRow)) {
      validMoves.push(new CoordinateModel(kingRow, 2));
    }

    return validMoves;
  };

  canKingSideCastle = (board: BoardModel, kingRow: number): boolean => {
    const { piece: kingSideRook } = board.getSquareOnCoordinate(
      new CoordinateModel(kingRow, 7),
    );
    const { piece: kingSideKnight } = board.getSquareOnCoordinate(
      new CoordinateModel(kingRow, 6),
    );
    const { piece: kingSideBishop } = board.getSquareOnCoordinate(
      new CoordinateModel(kingRow, 5),
    );
    return !kingSideRook?.hasMoved && !kingSideKnight && !kingSideBishop;
  };

  canQueenSideCastle = (board: BoardModel, kingRow: number): boolean => {
    const { piece: queenSideRook } = board.getSquareOnCoordinate(
      new CoordinateModel(kingRow, 0),
    );
    const { piece: queenSideKnight } = board.getSquareOnCoordinate(
      new CoordinateModel(kingRow, 1),
    );
    const { piece: queenSideBishop } = board.getSquareOnCoordinate(
      new CoordinateModel(kingRow, 2),
    );
    const { piece: queen } = board.getSquareOnCoordinate(
      new CoordinateModel(kingRow, 3),
    );
    return (
      !queenSideRook?.hasMoved && !queenSideKnight && !queenSideBishop && !queen
    );
  };
}
