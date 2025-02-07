import SquareModel from "../../models/SquareModel";
import { getPieceStyles } from "../../services/piece-service";
import {
  getSquareCoordinates,
  isLightSquare,
} from "../../services/square-service";
import "./square.css";

interface Props {
  square: SquareModel;
}

function Square({ square }: Props) {
  return (
    <div
      className={`h-full w-full ${
        isLightSquare(square) ? "bg-slate-100" : "bg-orange-900"
      }`}
    >
      <span>{getSquareCoordinates(square)}</span>
      {square.piece && (
        <i
          className={`fa-solid ${getPieceStyles(square.piece)}`}
        ></i>
      )}
    </div>
  );
}

export default Square;
