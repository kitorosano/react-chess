import MoveModel from "../models/MoveModel";

interface Props {
  moveHistory: Array<MoveModel>;
}

function MoveHistoryList({ moveHistory }: Props) {
  return (
    <ol>
      {moveHistory.map((move, index) => {
        const text = `${
          move.piece
        }: ${move.from.getCoordinates()} --> ${move.to.getCoordinates()}`;
        return <li key={index}>{text}</li>;
      })}
    </ol>
  );
}

export default MoveHistoryList;
