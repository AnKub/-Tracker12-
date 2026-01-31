
import Square from "./Square";
import './TicTac.scss';

export default function Board(){

  return (
  <>
    <div className="board-row">
      <Square  />
      <Square  />
      <Square  />
    </div>
    <div className="board-row">
      <Square  />
      <Square  />
      <Square  />
    </div>
    <div className="board-row">
      <Square  />
      <Square  />
      <Square  />
    </div>
</>
  );
}