import {
  colStartClasses,
  columnNotation,
  rowStartClasses,
} from "../constants/square-info";
import { CoordinateModel } from "./CoordinateModel";
import PieceModel from "./piece/PieceModel";

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
