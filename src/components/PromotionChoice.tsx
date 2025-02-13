import { pieceColors, pieceIcons, PieceType } from "../constants/piece-info";
import { PlayerColor } from "../models/PlayerModel";

interface Props {
  playerTurn: PlayerColor;
  selectPromotion: (pieceType: PieceType) => void;
}

function PromotionChoice({ playerTurn, selectPromotion }: Props) {
  const possiblePieceTypes = [
    PieceType.KNIGHT,
    PieceType.BISHOP,
    PieceType.ROOK,
    PieceType.QUEEN,
  ];

  return (
    <section className="py-2 flex justify-center items-center gap-3 border shadow">
      <p className="">Choose a piece to promote to:</p>
      {possiblePieceTypes.map((pieceType) => (
        <span key={pieceType} onClick={() => selectPromotion(pieceType)}>
          <i
            className={`fa fa-solid fa-2xl ${pieceIcons[pieceType]} ${pieceColors[playerTurn]}`}
          ></i>
        </span>
      ))}
    </section>
  );
}

export default PromotionChoice;
