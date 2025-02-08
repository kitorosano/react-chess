import { useCallback, useState } from "react";
import BoardModel from "../../models/BoardModel";
import { PlayerColor } from "../../models/PlayerModel";
import SquareModel from "../../models/SquareModel";
import { getValidMoves } from "../../services/move-service";
import Square from "./Square";

interface Props {
  board: BoardModel;
  movePiece: (currentSquare: SquareModel, targetSquare: SquareModel) => void;
  playingAsWhite: boolean;
  playerTurn: PlayerColor;
}

function Board({ board, movePiece, playingAsWhite, playerTurn }: Props) {
  const [selectedSquare, setSelectedSquare] = useState<SquareModel | null>(
    null,
  );

  const isValidMove = useCallback(
    (square: SquareModel) => {
      return getValidMoves(board, selectedSquare).some((validMoveCoordinate) =>
        validMoveCoordinate.isEquals(square.coordinates),
      );
    },
    [board, selectedSquare],
  );

  const handleSelectSquare = (square: SquareModel) => {
    if (!selectedSquare || !isValidMove(square))
      return setSelectedSquare(square);

    if (square.isNotEquals(selectedSquare)) {
      movePiece(selectedSquare, square);

      // Update player turn
      // Check for checkmate
      // Check for stalemate
    }

    setSelectedSquare(null);
  };

  return (
    <section className="grid grid-rows-8 grid-cols-8 max-w-xl aspect-square m-auto my-4 border shadow">
      {board.squares.map((square: SquareModel) => {
        const squareStyles = square.getStyles(playingAsWhite);
        const isFirstRow = square.row === 0;
        const isFirstColumn = square.column === 0;
        const isSquareSelected = selectedSquare?.isEquals(square);
        const canSelectSquare =
          square?.piece?.color === playerTurn || isValidMove(square);

        return (
          <div
            key={`square_${square.row}_${square.column}`}
            className={`${squareStyles} h-full wf-full`}
          >
            <Square
              square={square}
              showCoordinatesColumn={isFirstRow}
              showCoordinatesRow={isFirstColumn}
              showAsValidMove={isValidMove(square)}
              isSelected={isSquareSelected}
              canSelect={canSelectSquare}
              select={handleSelectSquare}
            />
          </div>
        );
      })}
    </section>
  );
}

export default Board;
