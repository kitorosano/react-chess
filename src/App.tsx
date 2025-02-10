import { useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import MoveHistoryList from "./components/MoveHistoryList";
import BoardModel from "./models/BoardModel";
import MoveModel from "./models/MoveModel";
import { PlayerColor } from "./models/PlayerModel";
import SquareModel from "./models/SquareModel";

function App() {
  const [board] = useState(new BoardModel());
  const [moveHistory, setMoveHistory] = useState<Array<MoveModel>>([]);
  const [playerTurn, setPlayerTurn] = useState(PlayerColor.WHITE);

  const handleMovePiece = (
    currentSquare: SquareModel,
    targetSquare: SquareModel,
  ) => {
    const { piece: currentPiece } = currentSquare;
    if (!currentPiece) return;

    board.updateSquarePiece(targetSquare, currentPiece);
    board.updateSquarePiece(currentSquare, null);

    const from = currentSquare.coordinates,
      to = targetSquare.coordinates,
      piece = currentPiece.type,
      color = currentPiece.color,
      hasCaptured = !!targetSquare.piece?.type;
    setMoveHistory((currentHistory) => [
      ...currentHistory,
      new MoveModel(from, to, piece, color, hasCaptured),
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
        movePiece={handleMovePiece}
      />
      <MoveHistoryList moveHistory={moveHistory} />
    </main>
  );
}

export default App;
