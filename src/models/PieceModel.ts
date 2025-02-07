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
}
