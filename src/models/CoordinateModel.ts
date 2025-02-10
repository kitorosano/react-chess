export class CoordinateModel {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  isEquals(coordinate: CoordinateModel): boolean {
    return this.row === coordinate.row && this.column === coordinate.column;
  }
}
