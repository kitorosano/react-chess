import {
  KING_SIDE_CASTLED_KING_COLUMN,
  PieceType,
  QUEEN_SIDE_CASTLED_KING_COLUMN,
} from "../../constants/piece-info";
import { PossibleMove } from "../../services/move-validation-service";
import { CoordinateModel } from "../CoordinateModel";
import { MoveType } from "../MoveModel";
import { PlayerColor } from "../PlayerModel";
import PieceModel from "./PieceModel";

export default class KingPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.KING, color);
  }

  getMoves(coordinates: CoordinateModel): Array<PossibleMove> {
    const possibleMoves: Array<PossibleMove> = [];
    const { row, column } = coordinates;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const possibleMove = new CoordinateModel(row + i, column + j);
        possibleMoves.push({
          singleConfig: { targetCoordinates: possibleMove },
        });
      }
    }

    // Check for castling
    if (this.hasMoved) return possibleMoves;

    const kingRow = this.isWhite() ? 0 : 7;
    // King side castle
    const possibleKingSideCastling = new CoordinateModel(
      kingRow,
      KING_SIDE_CASTLED_KING_COLUMN,
    );
    possibleMoves.push({
      singleConfig: {
        targetCoordinates: possibleKingSideCastling,
        mustBeNotMovedRook: new CoordinateModel(kingRow, 7),
        mustBeEmptyCoordinates: [
          new CoordinateModel(kingRow, 5),
          new CoordinateModel(kingRow, 6),
        ],
        moveType: MoveType.CASTLE_KING_SIDE,
      },
    });

    // Queen side castle
    const possibleQueenSideCastling = new CoordinateModel(
      kingRow,
      QUEEN_SIDE_CASTLED_KING_COLUMN,
    );
    possibleMoves.push({
      singleConfig: {
        targetCoordinates: possibleQueenSideCastling,
        mustBeNotMovedRook: new CoordinateModel(kingRow, 0),
        mustBeEmptyCoordinates: [
          new CoordinateModel(kingRow, 1),
          new CoordinateModel(kingRow, 2),
          new CoordinateModel(kingRow, 3),
        ],
        moveType: MoveType.CASTLE_QUEEN_SIDE,
      },
    });

    return possibleMoves;
  }
}
