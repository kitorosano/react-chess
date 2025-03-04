import {
  KING_SIDE_CASTLED_KING_COLUMN,
  PieceType,
  QUEEN_SIDE_CASTLED_KING_COLUMN,
} from "../../constants/piece-info";
import { checkValidMove } from "../../services/move-validation-service";
import BoardModel from "../BoardModel";
import MoveModel, { MoveType } from "../MoveModel";
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
  ): Array<MoveModel | null> => {
    const validMoves: Array<MoveModel | null> = [];

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const targetMove = new MoveModel(square.row + i, square.column + j);
        validMoves.push(checkValidMove({ board, square, targetMove }).move);
      }
    }

    // Check for castling
    if (this.hasMoved) return validMoves;

    const kingRow = this.isWhite() ? 0 : 7;
    if (this.canKingSideCastle(board, kingRow)) {
      const targetMove = new MoveModel(
        kingRow,
        KING_SIDE_CASTLED_KING_COLUMN,
        MoveType.CASTLE_KING_SIDE,
      );
      validMoves.push(targetMove);
    }
    if (this.canQueenSideCastle(board, kingRow)) {
      const targetMove = new MoveModel(
        kingRow,
        QUEEN_SIDE_CASTLED_KING_COLUMN,
        MoveType.CASTLE_QUEEN_SIDE,
      );
      validMoves.push(targetMove);
    }

    return validMoves;
  };

  canKingSideCastle = (board: BoardModel, kingRow: number): boolean => {
    const { piece: kingSideRook } = board.getSquareOnCoordinate(
      new MoveModel(kingRow, 7),
    );
    const { piece: PieceOnColumnG } = board.getSquareOnCoordinate(
      new MoveModel(kingRow, 6),
    );
    const { piece: pieceOnColumnF } = board.getSquareOnCoordinate(
      new MoveModel(kingRow, 5),
    );
    return (
      !!kingSideRook &&
      kingSideRook.isRook() &&
      !kingSideRook?.hasMoved &&
      !PieceOnColumnG &&
      !pieceOnColumnF
    );
  };

  canQueenSideCastle = (board: BoardModel, kingRow: number): boolean => {
    const { piece: queenSideRook } = board.getSquareOnCoordinate(
      new MoveModel(kingRow, 0),
    );
    const { piece: pieceOnColumnB } = board.getSquareOnCoordinate(
      new MoveModel(kingRow, 1),
    );
    const { piece: pieceOnColumnC } = board.getSquareOnCoordinate(
      new MoveModel(kingRow, 2),
    );
    const { piece: pieceOnColumnD } = board.getSquareOnCoordinate(
      new MoveModel(kingRow, 3),
    );
    return (
      !!queenSideRook &&
      queenSideRook.isRook() &&
      !queenSideRook?.hasMoved &&
      !pieceOnColumnB &&
      !pieceOnColumnC &&
      !pieceOnColumnD
    );
  };
}
