import { useMemo } from "react";
import SquareModel from "../../models/SquareModel";
import "./square.css";

interface Props {
  square: SquareModel;
  showCoordinatesColumn?: boolean;
  showCoordinatesRow?: boolean;
  isSelected?: boolean;
  canSelect?: boolean;
  select: (square: SquareModel | null) => void;
}

function Square({
  square,
  showCoordinatesColumn,
  showCoordinatesRow,
  isSelected,
  canSelect,
  select,
}: Props) {
  const backgroundColor = useMemo(
    () =>
      isSelected
        ? "bg-gray-400"
        : square.isLightSquare()
        ? "bg-slate-100"
        : "bg-orange-900",
    [isSelected, square],
  );

  const handleClick = () => {
    if (canSelect) select(isSelected ? null : square);
  };

  return (
    <div
      className={`relative h-full w-full flex justify-center items-center ${
        canSelect && "hover:cursor-pointer"
      } ${backgroundColor}`}
      onClick={handleClick}
    >
      {showCoordinatesColumn && (
        <span className="absolute bottom-1 right-1 text-sm text-gray-900">
          {square.getColumnCoordinates()}
        </span>
      )}
      {showCoordinatesRow && (
        <span className="absolute top-1 left-1 text-sm text-gray-900">
          {square.getRowCoordinates()}
        </span>
      )}

      {square.piece && (
        <i
          className={`fa-solid fa-2 xl ${square.piece.getIcon()} ${square.piece.getColor()}`}
        ></i>
      )}
    </div>
  );
}

export default Square;
