import BishopPieceModel from "../models/piece/BishopPieceModel";
import KingPieceModel from "../models/piece/KingPieceModel";
import KnightPieceModel from "../models/piece/KnightPieceModel";
import PawnPieceModel from "../models/piece/PawnPieceModel";
import QueenPieceModel from "../models/piece/QueenPieceModel";
import RookPieceModel from "../models/piece/RookPieceModel";
import { PlayerColor } from "../models/PlayerModel";

export enum PieceType {
  PAWN = "PAWN",
  KNIGHT = "KNIGHT",
  BISHOP = "BISHOP",
  ROOK = "ROOK",
  QUEEN = "QUEEN",
  KING = "KING",
}

export const pieceIcons: Record<string, string> = {
  [PieceType.PAWN]: "fa-chess-pawn",
  [PieceType.KNIGHT]: "fa-chess-knight",
  [PieceType.BISHOP]: "fa-chess-bishop",
  [PieceType.ROOK]: "fa-chess-rook",
  [PieceType.QUEEN]: "fa-chess-queen",
  [PieceType.KING]: "fa-chess-king",
};

export const pieceColors: Record<string, string> = {
  [PlayerColor.WHITE]: "text-white icon-shadow-white",
  [PlayerColor.BLACK]: "text-black icon-shadow-black",
};

export const pieceClasses = {
  [PieceType.PAWN]: PawnPieceModel,
  [PieceType.KNIGHT]: KnightPieceModel,
  [PieceType.BISHOP]: BishopPieceModel,
  [PieceType.ROOK]: RookPieceModel,
  [PieceType.QUEEN]: QueenPieceModel,
  [PieceType.KING]: KingPieceModel,
};
