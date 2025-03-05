import {
  pieceClasses,
  pieceColors,
  pieceIcons,
  PieceType,
} from "../../constants/piece-info";
import { PossibleMove } from "../../services/move-validation-service";
import { CoordinateModel } from "../CoordinateModel";
import MoveHistoryModel from "../MoveHistoryModel";
import { PlayerColor } from "../PlayerModel";

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

  abstract getMoves(
    coordinates: CoordinateModel,
    lastMove: MoveHistoryModel | null,
  ): Array<PossibleMove>;

  getStylesIcon(): string {
    return pieceIcons[this.type];
  }

  getStylesColor(): string {
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

  clone(): PieceModel {
    const piece = PieceModel.create(this.type, this.color);
    piece.hasMoved = this.hasMoved;
    return piece;
  }
}
