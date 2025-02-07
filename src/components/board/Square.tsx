import SquareModel from "../../models/SquareModel";
import "./square.css";

interface Props {
  square: SquareModel;
}

function Square({ square }: Props) {
  return (
    <div
      className={`h-full w-full ${
        square.isLightSquare() ? "bg-slate-100" : "bg-orange-900"
      }`}
    >
      <span>{square.getColumnCoordinates()}</span>
      <span>{square.getRowCoordinates()}</span>

      {square.piece && (
        <i className={`fa-solid ${square.piece.getStyles()}`}></i>
      )}
    </div>
  );
}

export default Square;
