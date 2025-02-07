import { useState } from "react";
import BoardModel from "../../models/BoardModel";
import { PlayerColor } from "../../models/PlayerModel";
import SquareModel from "../../models/SquareModel";
import { getSquareStyles } from "../../services/board-service";
import Square from "./Square";

interface Props {
  board: BoardModel;
  playingAsWhite: boolean;
  playerTurn: PlayerColor;
}

function Board({ board, playingAsWhite, playerTurn }: Props) {
  const [selectedSquare, setSelectedSquare] = useState<SquareModel | null>(
    null,
  );

  return (
    <section className="grid grid-rows-8 grid-cols-8 max-w-xl aspect-square m-auto my-4 border shadow">
      {board.squares.map((square: SquareModel) => {
        const squareStyles = getSquareStyles(square, playingAsWhite);
        return (
          <div
            key={`square_${square.row}_${square.column}`}
            className={`${squareStyles} h-full wf-full`}
          >
            <Square
              square={square}
              showCoordinatesColumn={square.row === 0}
              showCoordinatesRow={square.column === 0}
              isSelected={selectedSquare?.isEquals(square)}
              canSelect={square?.piece?.color === playerTurn}
              select={setSelectedSquare}
            />
          </div>
        );
      })}
    </section>
  );
}

export default Board;
