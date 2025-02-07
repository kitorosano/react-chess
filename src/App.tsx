import { useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import BoardModel from "./models/BoardModel";

function App() {
  const [board] = useState(new BoardModel());

  return (
    <>
      <h1>React Chess</h1>
      <Board board={board} playingAsWhite={true} />
    </>
  );
}

export default App;
