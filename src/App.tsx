import { useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import MoveHistoryList from "./components/MoveHistoryList";
import {
  KING_SIDE_CASTLED_ROOK_COLUMN,
  KING_SIDE_ROOK_COLUMN,
  QUEEN_SIDE_CASTLED_ROOK_COLUMN,
  QUEEN_SIDE_ROOK_COLUMN,
} from "./constants/initial-piece-positions";
import BoardModel from "./models/BoardModel";
import { CoordinateModel } from "./models/CoordinateModel";
import MoveHistoryModel from "./models/MoveHistoryModel";
import MoveModel from "./models/MoveModel";
import PieceModel from "./models/piece/PieceModel";
import { PlayerColor } from "./models/PlayerModel";
import SquareModel from "./models/SquareModel";

function App() {
  const [board] = useState(new BoardModel());
  const [moveHistory, setMoveHistory] = useState<Array<MoveHistoryModel>>([]);
  const [playerTurn, setPlayerTurn] = useState(PlayerColor.WHITE);

  const handleRookCastling = (
    row: number,
    currentColumn: number,
    targetColumn: number,
  ) => {
    const currentRookSquare = board.getSquareOnCoordinate(
      new CoordinateModel(row, currentColumn),
    );
    const targetRookSquare = board.getSquareOnCoordinate(
      new CoordinateModel(row, targetColumn),
    );
    board.updateSquarePiece(targetRookSquare, currentRookSquare.piece);
    board.updateSquarePiece(currentRookSquare, null);
  };

  const handleEnPassant = (
    currentPiece: PieceModel,
    targetSquare: SquareModel,
  ) => {
    const { row, column } = targetSquare;
    const targetRow = currentPiece.isWhite() ? row - 1 : row + 1;
    const pawnToRemoveSquare = board.getSquareOnCoordinate(
      new CoordinateModel(targetRow, column),
    );
    board.updateSquarePiece(pawnToRemoveSquare, null);
  };

  const handleMovePiece = (
    currentSquare: SquareModel,
    targetSquare: SquareModel,
    move: MoveModel,
  ) => {
    const { piece: currentPiece } = currentSquare;
    const { piece: targetPiece } = targetSquare;
    if (!currentPiece) return;

    currentPiece.setHasMoved();
    board.updateSquarePiece(targetSquare, currentPiece);
    board.updateSquarePiece(currentSquare, null);

    if (move.isCastleKingSide()) {
      handleRookCastling(
        move.row,
        KING_SIDE_ROOK_COLUMN,
        KING_SIDE_CASTLED_ROOK_COLUMN,
      );
    }
    if (move.isCastleQueenSide()) {
      handleRookCastling(
        move.row,
        QUEEN_SIDE_ROOK_COLUMN,
        QUEEN_SIDE_CASTLED_ROOK_COLUMN,
      );
    }
    if (move.isEnPassant()) {
      handleEnPassant(currentPiece, targetSquare);
    }

    const from = currentSquare.coordinates,
      to = targetSquare.coordinates,
      piece = currentPiece.type,
      color = currentPiece.color,
      hasCaptured = !!targetPiece?.type,
      moveType = move.type;
    setMoveHistory((currentHistory) => [
      ...currentHistory,
      new MoveHistoryModel(from, to, piece, color, hasCaptured, moveType),
    ]);
    setPlayerTurn((currentTurn) =>
      currentTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE,
    );
  };

  return (
    <main className="max-w-xl w-3/4 mx-auto my-4">
      <Board
        board={board}
        playingAsWhite={true}
        playerTurn={playerTurn}
        moveHistory={moveHistory}
        movePiece={handleMovePiece}
      />
      <MoveHistoryList moveHistory={moveHistory} />
    </main>
  );
}

export default App;
