import PieceModel, { PieceType } from "../models/PieceModel";
import { PlayerColor } from "../models/PlayerModel";

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

export const getPieceStyles = (piece: PieceModel): string => {
  return `${pieceIcons[piece.type]} ${pieceColors[piece.color]}`;
};
