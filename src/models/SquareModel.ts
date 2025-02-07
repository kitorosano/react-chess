import { CoordinateModel } from "./CoordinateModel";
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

  setPiece(piece: PieceModel): void {
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
}
