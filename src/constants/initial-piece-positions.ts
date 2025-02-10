import { PlayerColor } from "../models/PlayerModel";
import { PieceType } from "./piece-info";

interface PiecePosition {
  rows: Array<number>;
  columns: Array<number>;
  pieceType: PieceType;
  playerColor: PlayerColor;
}

export const initialPiecePositions: Array<PiecePosition> = [
  // White pieces
  {
    rows: [1],
    columns: [0, 1, 2, 3, 4, 5, 6, 7],
    pieceType: PieceType.PAWN,
    playerColor: PlayerColor.WHITE,
  },
  {
    rows: [0],
    columns: [0, 7],
    pieceType: PieceType.ROOK,
    playerColor: PlayerColor.WHITE,
  },
  {
    rows: [0],
    columns: [1, 6],
    pieceType: PieceType.KNIGHT,
    playerColor: PlayerColor.WHITE,
  },
  {
    rows: [0],
    columns: [2, 5],
    pieceType: PieceType.BISHOP,
    playerColor: PlayerColor.WHITE,
  },
  {
    rows: [0],
    columns: [3],
    pieceType: PieceType.QUEEN,
    playerColor: PlayerColor.WHITE,
  },
  {
    rows: [0],
    columns: [4],
    pieceType: PieceType.KING,
    playerColor: PlayerColor.WHITE,
  },

  // Black pieces
  {
    rows: [6],
    columns: [0, 1, 2, 3, 4, 5, 6, 7],
    pieceType: PieceType.PAWN,
    playerColor: PlayerColor.BLACK,
  },
  {
    rows: [7],
    columns: [0, 7],
    pieceType: PieceType.ROOK,
    playerColor: PlayerColor.BLACK,
  },
  {
    rows: [7],
    columns: [1, 6],
    pieceType: PieceType.KNIGHT,
    playerColor: PlayerColor.BLACK,
  },
  {
    rows: [7],
    columns: [2, 5],
    pieceType: PieceType.BISHOP,
    playerColor: PlayerColor.BLACK,
  },
  {
    rows: [7],
    columns: [3],
    pieceType: PieceType.QUEEN,
    playerColor: PlayerColor.BLACK,
  },
  {
    rows: [7],
    columns: [4],
    pieceType: PieceType.KING,
    playerColor: PlayerColor.BLACK,
  },
];

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