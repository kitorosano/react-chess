import { initialPiecePositions } from "../constants/initial-piece-positions";
import PieceModel from "./PieceModel";
import SquareModel from "./SquareModel";

export default class BoardModel {
  squares: Array<SquareModel> = [];

  constructor() {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const square = new SquareModel(row, column);

        initialPiecePositions.forEach((piecePosition) => {
          const { rows, columns, pieceType, playerColor } = piecePosition;
          if (rows.includes(row) && columns.includes(column)) {
            square.setPiece(new PieceModel(pieceType, playerColor));
          }
        });

        this.squares.push(square);
      }
    }
  }
}
