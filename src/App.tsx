import { useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import BoardModel from "./models/BoardModel";
import { PlayerColor } from "./models/PlayerModel";

function App() {
  const [board] = useState(new BoardModel());
  const [playerTurn, setPlayerTurn] = useState(PlayerColor.WHITE);

  return (
    <>
      <h1>React Chess</h1>
      <Board board={board} playingAsWhite={true} playerTurn={playerTurn} />
    </>
  );
}

export default App;
