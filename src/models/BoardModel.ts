import { BOARD_COLUMNS, BOARD_ROWS } from "../constants/board-info";
import { initialPiecePositions } from "../constants/initial-piece-positions";
import { CoordinateModel } from "./CoordinateModel";
import PieceModel from "./piece/PieceModel";
import SquareModel from "./SquareModel";

export default class BoardModel {
  squares: Array<SquareModel> = [];

  constructor() {
    for (let row = 0; row < BOARD_ROWS; row++) {
      for (let column = 0; column < BOARD_COLUMNS; column++) {
        const square = new SquareModel(row, column);

        initialPiecePositions.forEach((piecePosition) => {
          const { rows, columns, pieceType, playerColor } = piecePosition;
          if (rows.includes(row) && columns.includes(column)) {
            square.setPiece(PieceModel.create(pieceType, playerColor));
          }
        });

        this.squares.push(square);
      }
    }
  }

  getSquareOnCoordinate(coordinate: CoordinateModel): SquareModel {
    return this.squares.find((s) => s.coordinates.isEquals(coordinate))!;
  }

  updateSquarePiece(square: SquareModel, piece: PieceModel | null) {
    const squareIndex = this.squares.findIndex((s) => s.isEquals(square));
    this.squares[squareIndex].setPiece(piece);
  }
}
