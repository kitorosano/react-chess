import { CoordinateModel } from "./CoordinateModel";
import PieceModel from "./piece/PieceModel";

const rowStartClasses: Record<number, string> = {
  1: "row-start-1",
  2: "row-start-2",
  3: "row-start-3",
  4: "row-start-4",
  5: "row-start-5",
  6: "row-start-6",
  7: "row-start-7",
  8: "row-start-8",
};

const colStartClasses: Record<number, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
  7: "col-start-7",
  8: "col-start-8",
};

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
  coordinates: CoordinateModel;
  piece: PieceModel | null;

  constructor(row: number, column: number) {
    this.coordinates = new CoordinateModel(row, column);
    this.piece = null;
  }

  get row(): number {
    return this.coordinates.row;
  }

  get column(): number {
    return this.coordinates.column;
  }

  getStyles(playingAsWhite: boolean): string {
    const rowIndex = playingAsWhite ? 8 - this.row : this.row + 1;
    const colIndex = playingAsWhite ? this.column + 1 : 8 - this.column;
    const rowStartStyle = rowStartClasses[rowIndex];
    const colStartStyle = colStartClasses[colIndex];

    return `${rowStartStyle} ${colStartStyle}`;
  }

  setPiece(piece: PieceModel | null): void {
    this.piece = piece;
  }

  getColumnCoordinates(): string {
    return columnNotation[this.coordinates.column];
  }

  getRowCoordinates(): string {
    return `${this.coordinates.row + 1}`;
  }

  isLightSquare(): boolean {
    return (this.coordinates.row + this.coordinates.column) % 2 !== 0;
  }

  isEquals(square: SquareModel): boolean {
    return (
      this.coordinates.row === square.coordinates.row &&
      this.coordinates.column === square.coordinates.column
    );
  }

  isNotEquals(square: SquareModel): boolean {
    return !this.isEquals(square);
  }

  isPieceSameColor(square: SquareModel): boolean {
    return this.piece?.color === square.piece?.color;
  }
}
