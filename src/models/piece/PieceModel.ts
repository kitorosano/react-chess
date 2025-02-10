import {
  pieceClasses,
  pieceColors,
  pieceIcons,
  PieceType,
} from "../../constants/piece-info";
import BoardModel from "../BoardModel";
import MoveModel from "../MoveModel";
import { PlayerColor } from "../PlayerModel";
import SquareModel from "../SquareModel";

export default abstract class PieceModel {
  readonly type: PieceType;
  readonly color: PlayerColor;
  hasMoved: boolean = false;

  constructor(type: PieceType, color: PlayerColor) {
    this.type = type;
    this.color = color;
  }

  static create(type: PieceType, color: PlayerColor): PieceModel {
    return new pieceClasses[type](color);
  }

  abstract getValidMoves(
    board: BoardModel,
    square: SquareModel,
  ): Array<MoveModel | null>;

  getIcon(): string {
    return pieceIcons[this.type];
  }

  getColor(): string {
    return pieceColors[this.color];
  }

  isWhite(): boolean {
    return this.color === PlayerColor.WHITE;
  }

  isBlack(): boolean {
    return this.color === PlayerColor.BLACK;
  }

  isPawn(): boolean {
    return this.type === PieceType.PAWN;
  }

  isKnight(): boolean {
    return this.type === PieceType.KNIGHT;
  }

  isBishop(): boolean {
    return this.type === PieceType.BISHOP;
  }

  isRook(): boolean {
    return this.type === PieceType.ROOK;
  }

  isQueen(): boolean {
    return this.type === PieceType.QUEEN;
  }

  isKing(): boolean {
    return this.type === PieceType.KING;
  }

  isSameColor(piece: PieceModel): boolean {
    return this.color === piece.color;
  }

  setHasMoved(): void {
    this.hasMoved = true;
  }
}
