import { PlayerColor } from "../models/PlayerModel";

interface Props {
  color: PlayerColor | null;
}

function WinnerBanner({ color }: Props) {
  if (!color) return null;
  return <h3 className="text-2xl text-center w-full">{color} WINS</h3>;
}

export default WinnerBanner;
