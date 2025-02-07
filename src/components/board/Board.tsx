import BoardModel from "../../models/BoardModel";
import SquareModel from "../../models/SquareModel";
import { getSquareStyles } from "../../services/board-service";
import Square from "./Square";

interface Props {
  board: BoardModel;
  playingAsWhite: boolean;
}

function Board({ board, playingAsWhite }: Props) {
  return (
    <>
      <h2>Board</h2>
      <section className="grid grid-rows-8 grid-cols-8">
        {board.squares.map((square: SquareModel) => {
          const squareStyles = getSquareStyles(square, playingAsWhite);
          return (
            <div className={squareStyles}>
              <Square
                key={`square_${square.row}_${square.column}`}
                square={square}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Board;
