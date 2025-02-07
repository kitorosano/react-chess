import { PlayerColor } from "./PlayerModel";

export enum PieceType {
  PAWN = "PAWN",
  KNIGHT = "KNIGHT",
  BISHOP = "BISHOP",
  ROOK = "ROOK",
  QUEEN = "QUEEN",
  KING = "KING",
}

const pieceIcons: Record<string, string> = {
  [PieceType.PAWN]: "fa-chess-pawn",
  [PieceType.KNIGHT]: "fa-chess-knight",
  [PieceType.BISHOP]: "fa-chess-bishop",
  [PieceType.ROOK]: "fa-chess-rook",
  [PieceType.QUEEN]: "fa-chess-queen",
  [PieceType.KING]: "fa-chess-king",
};

const pieceColors: Record<string, string> = {
  [PlayerColor.WHITE]: "text-white icon-shadow-white",
  [PlayerColor.BLACK]: "text-black icon-shadow-black",
};

export default class PieceModel {
  readonly type: PieceType;
  readonly color: PlayerColor;

  constructor(type: PieceType, color: PlayerColor) {
    this.type = type;
    this.color = color;
  }

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
}
