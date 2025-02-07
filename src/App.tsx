import { useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import BoardModel from "./models/BoardModel";
import { PlayerColor } from "./models/PlayerModel";
import SquareModel from "./models/SquareModel";

function App() {
  const [board] = useState(new BoardModel());
  const [playerTurn, setPlayerTurn] = useState(PlayerColor.WHITE);

  const handleMovePiece = (
    currentSquare: SquareModel,
    targetSquare: SquareModel,
  ) => {
    board.updateSquarePiece(targetSquare, currentSquare.piece);
    board.updateSquarePiece(currentSquare, null);
    setPlayerTurn((currentTurn) =>
      currentTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE,
    );
  };

  return (
    <>
      <h1>React Chess</h1>
      <Board
        board={board}
        playingAsWhite={true}
        playerTurn={playerTurn}
        movePiece={handleMovePiece}
      />
    </>
  );
}

export default App;
