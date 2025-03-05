import { BOARD_COLUMNS, BOARD_ROWS } from "../../constants/board-info";
import { PieceType } from "../../constants/piece-info";
import { PossibleMove } from "../../services/move-validation-service";
import { CoordinateModel } from "../CoordinateModel";
import { PlayerColor } from "../PlayerModel";
import PieceModel from "./PieceModel";

export default class QueenPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.QUEEN, color);
  }

  getMoves(coordinates: CoordinateModel): Array<PossibleMove> {
    return [
      // Rook moves
      {
        rowColumnConfig: {
          startPos: coordinates.column + 1,
          endPos: BOARD_COLUMNS - 1,
          increment: 1,
          rowIncrement: 0,
          columnIncrement: 1,
        },
      },
      {
        rowColumnConfig: {
          startPos: coordinates.column - 1,
          endPos: 0,
          increment: -1,
          rowIncrement: 0,
          columnIncrement: -1,
        },
      },
      {
        rowColumnConfig: {
          startPos: coordinates.row + 1,
          endPos: BOARD_ROWS - 1,
          increment: 1,
          rowIncrement: 1,
          columnIncrement: 0,
        },
      },
      {
        rowColumnConfig: {
          startPos: coordinates.row - 1,
          endPos: 0,
          increment: -1,
          rowIncrement: -1,
          columnIncrement: 0,
        },
      },
      // Bishop moves
      {
        rowColumnConfig: {
          startPos: coordinates.row + 1,
          endPos: BOARD_ROWS - 1,
          increment: 1,
          rowIncrement: 1,
          columnIncrement: 1,
        },
      },
      {
        rowColumnConfig: {
          startPos: coordinates.row + 1,
          endPos: BOARD_ROWS - 1,
          increment: 1,
          rowIncrement: 1,
          columnIncrement: -1,
        },
      },
      {
        rowColumnConfig: {
          startPos: coordinates.row - 1,
          endPos: 0,
          increment: -1,
          rowIncrement: -1,
          columnIncrement: 1,
        },
      },
      {
        rowColumnConfig: {
          startPos: coordinates.row - 1,
          endPos: 0,
          increment: -1,
          rowIncrement: -1,
          columnIncrement: -1,
        },
      },
    ];
  }
}
