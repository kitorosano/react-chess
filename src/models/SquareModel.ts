import PieceModel from "./PieceModel";

const columnNotation: Record<number, string> = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
};

export default class SquareModel {
  readonly row: number;
  readonly column: number;
  piece: PieceModel | null = null;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  setPiece(piece: PieceModel): void {
    this.piece = piece;
  }

  getColumnCoordinates(): string {
    return columnNotation[this.column];
  }

  getRowCoordinates(): string {
    return `${this.row + 1}`;
  }

  isLightSquare(): boolean {
    return (this.row + this.column) % 2 !== 0;
  }
}
