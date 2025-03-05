import { useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import MoveHistoryList from "./components/MoveHistoryList";
import PromotionChoice from "./components/PromotionChoice";
import { PieceType } from "./constants/piece-info";
import GameModel from "./models/GameModel";
import MoveModel from "./models/MoveModel";
import SquareModel from "./models/SquareModel";

function App() {
  const [key, setKey] = useState(0);
  const [game] = useState(new GameModel());

  const handlePromotion = (pieceType: PieceType) => {
    game.promotion(pieceType);
    setKey(key + 1);
  };

  const handleMovePiece = (
    currentSquare: SquareModel,
    targetSquare: SquareModel,
    move: MoveModel,
  ) => {
    game.movePiece(currentSquare, targetSquare, move);
    setKey(key + 1);
  };

  const handleGetValidMoves = (square: SquareModel | null) => {
    return game.getValidMoves(square);
  };

  return (
    <main key={key} className="max-w-xl w-3/4 mx-auto my-4">
      <Board
        board={game.getBoard()}
        playingAsWhite={true}
        playerTurn={game.getPlayerTurn()}
        blockMoves={!!game.getPromotionSquare()}
        movePiece={handleMovePiece}
        getValidMoves={handleGetValidMoves}
      />
      {!!game.getPromotionSquare() && (
        <PromotionChoice
          playerTurn={game.getPlayerTurn()}
          selectPromotion={handlePromotion}
        />
      )}
      <MoveHistoryList moveHistory={game.getMoveHistory()} />
    </main>
  );
}

export default App;
