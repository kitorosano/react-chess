import SquareModel from "./SquareModel";

export default class BoardModel {
  squares: Array<SquareModel> = [];

  constructor() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.squares.push(new SquareModel(i, j));
      }
    }
  }
}
