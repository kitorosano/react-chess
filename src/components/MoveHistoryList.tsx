import MoveHistoryModel from "../models/MoveHistoryModel";

interface Props {
  moveHistory: Array<MoveHistoryModel>;
}

function MoveHistoryList({ moveHistory }: Props) {
  return (
    <section className="w-full flex flex-wrap">
      {moveHistory.map((move, index) => {
        const isWhiteMove = index % 2 === 0;
        return (
          <span key={index} className="text-xs mx-0.5">
            {isWhiteMove && (
              <span className="mr-1 ml-2 text-gray-400">{index / 2 + 1}.</span>
            )}
            {move.toNotation}
          </span>
        );
      })}
    </section>
  );
}

export default MoveHistoryList;
