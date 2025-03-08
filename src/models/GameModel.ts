import {
  KING_SIDE_CASTLED_ROOK_COLUMN,
  KING_SIDE_ROOK_COLUMN,
  pieceClasses,
  PieceType,
  QUEEN_SIDE_CASTLED_ROOK_COLUMN,
  QUEEN_SIDE_ROOK_COLUMN,
} from "../constants/piece-info";
import {
  getAllValidMovesForPlayer,
  getValidMoves,
} from "../services/move-validation-service";
import BoardModel from "./BoardModel";
import { CoordinateModel } from "./CoordinateModel";
import MoveHistoryModel from "./MoveHistoryModel";
import MoveModel, { MoveType } from "./MoveModel";
import PieceModel from "./piece/PieceModel";
import { PlayerColor } from "./PlayerModel";
import SquareModel from "./SquareModel";

export default class GameModel {
  private readonly board: BoardModel;
  private moveHistory: Array<MoveHistoryModel> = [];
  private playerTurn: PlayerColor = PlayerColor.WHITE;
  private promotionSquare: SquareModel | null = null;
  private winner: PlayerColor | null = null;

  constructor() {
    this.board = new BoardModel();
  }

  getBoard(): BoardModel {
    return this.board;
  }

  getMoveHistory(): Array<MoveHistoryModel> {
    return this.moveHistory;
  }

  getLastMove(): MoveHistoryModel | null {
    return this.moveHistory[this.moveHistory.length - 1] || null;
  }

  addMoveToHistory(move: MoveHistoryModel) {
    this.moveHistory.push(move);
  }

  getPlayerTurn(): PlayerColor {
    return this.playerTurn;
  }

  switchPlayerTurn(): void {
    this.playerTurn =
      this.playerTurn === PlayerColor.WHITE
        ? PlayerColor.BLACK
        : PlayerColor.WHITE;

    this.checkForWinner();
  }

  getPromotionSquare(): SquareModel | null {
    return this.promotionSquare;
  }

  getWinner(): PlayerColor | null {
    return this.winner;
  }

  movePiece(
    currentSquare: SquareModel,
    targetSquare: SquareModel,
    move: MoveModel,
  ) {
    const { piece: currentPiece } = currentSquare;
    const { piece: targetPiece } = targetSquare;
    if (!currentPiece || !!this.promotionSquare) return;

    const from = currentSquare.coordinates,
      to = targetSquare.coordinates,
      piece = currentPiece.type,
      color = currentPiece.color,
      hasCaptured = !!targetPiece?.type,
      moveType = move.type;
    this.addMoveToHistory(
      new MoveHistoryModel(from, to, piece, color, hasCaptured, moveType),
    );

    currentPiece.setHasMoved();
    this.board.movePiece(currentSquare, targetSquare);

    if (move.isCastleKingSide()) {
      this.castling(
        move.row,
        KING_SIDE_ROOK_COLUMN,
        KING_SIDE_CASTLED_ROOK_COLUMN,
      );
    }
    if (move.isCastleQueenSide()) {
      this.castling(
        move.row,
        QUEEN_SIDE_ROOK_COLUMN,
        QUEEN_SIDE_CASTLED_ROOK_COLUMN,
      );
    }
    if (move.isEnPassant()) {
      this.enPassant(currentPiece, targetSquare);
    }
    if (move.isPromotion()) {
      this.promotionSquare = targetSquare;
      return;
    }

    this.switchPlayerTurn();
  }

  promotion(pieceType: PieceType) {
    if (!this.promotionSquare) return;

    this.board.updateSquarePiece(
      this.promotionSquare,
      new pieceClasses[pieceType](this.playerTurn),
    );

    const lastMove = this.getLastMove()!;
    lastMove.type = MoveType.PROMOTION;
    lastMove.promotedTo = pieceType;

    this.moveHistory = [...this.moveHistory.slice(0, -1), lastMove];

    this.promotionSquare = null;
    this.switchPlayerTurn();
  }

  castling(row: number, currentColumn: number, targetColumn: number) {
    const currentRookSquare = this.board.getSquareOnCoordinate(
      new CoordinateModel(row, currentColumn),
    );
    const targetRookSquare = this.board.getSquareOnCoordinate(
      new CoordinateModel(row, targetColumn),
    );

    if (!currentRookSquare || !targetRookSquare) return;

    this.board.updateSquarePiece(targetRookSquare, currentRookSquare.piece);
    this.board.updateSquarePiece(currentRookSquare, null);
  }

  enPassant(currentPiece: PieceModel, targetSquare: SquareModel) {
    const { row, column } = targetSquare;
    const targetRow = currentPiece.isWhite() ? row - 1 : row + 1;
    const pawnToRemoveSquare = this.board.getSquareOnCoordinate(
      new CoordinateModel(targetRow, column),
    );

    if (!pawnToRemoveSquare) return;

    this.board.updateSquarePiece(pawnToRemoveSquare, null);
  }

  getValidMoves(square: SquareModel | null): Array<MoveModel> {
    return getValidMoves(this.board, square, this.getLastMove());
  }

  checkForWinner() {
    const playerValidMoves = getAllValidMovesForPlayer(
      this.board,
      this.playerTurn,
      false,
    );
    if (!playerValidMoves.length) {
      this.winner =
        this.playerTurn === PlayerColor.WHITE
          ? PlayerColor.BLACK
          : PlayerColor.WHITE;
    }
  }

  playerInCheck(): boolean {
    const playerColor = this.playerTurn;
    const oponentColor =
      playerColor === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE;

    const allOponentValidMoves: Array<MoveModel> = getAllValidMovesForPlayer(
      this.board,
      oponentColor,
      true,
    );

    return allOponentValidMoves.some((move) => move.givesCheck);
  }
}
