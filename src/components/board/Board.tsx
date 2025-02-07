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
    <section className="grid grid-rows-8 grid-cols-8 max-w-xl aspect-square m-auto my-4 border shadow">
      {board.squares.map((square: SquareModel) => {
        const squareStyles = getSquareStyles(square, playingAsWhite);
        return (
          <div
            key={`square_${square.row}_${square.column}`}
            className={`${squareStyles} h-full wf-full`}
          >
            <Square square={square} />
          </div>
        );
      })}
    </section>
  );
}

export default Board;
