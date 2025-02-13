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

export const pieceNotation = {
  [PieceType.PAWN]: "",
  [PieceType.KNIGHT]: "N",
  [PieceType.BISHOP]: "B",
  [PieceType.ROOK]: "R",
  [PieceType.QUEEN]: "Q",
  [PieceType.KING]: "K",
};

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

// initial rook coordinates
export const KING_SIDE_ROOK_COLUMN = 7;
export const QUEEN_SIDE_ROOK_COLUMN = 0;
export const KING_SIDE_CASTLED_ROOK_COLUMN = 5;
export const QUEEN_SIDE_CASTLED_ROOK_COLUMN = 3;

// king coordinates
export const KING_START_COLUMN = 4;
export const KING_SIDE_CASTLED_KING_COLUMN = 6;
export const QUEEN_SIDE_CASTLED_KING_COLUMN = 2;

// initial pawn coordinates
export const WHITE_PAWN_ROW = 1;
export const BLACK_PAWN_ROW = 6;
export const WHITE_ROW_FOR_EN_PASSANT = 4;
export const BLACK_ROW_FOR_EN_PASSANT = 3;
export const WHITE_PAWN_MAY_PROMOTE_ROW = 6;
export const BLACK_PAWN_MAY_PROMOTE_ROW = 1;
