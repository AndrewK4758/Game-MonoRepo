import { GameBoard } from '@aklapper/ChutesAndLadders';
import { AxiosResponse } from 'axios';
import { useLoaderData } from 'react-router-dom';

interface IGameBoard extends AxiosResponse {
  gameBoard: GameBoard;
}

export default function BoardAndWaitToStart() {
  const data = useLoaderData() as IGameBoard;
  const board = data.gameBoard;
  console.log(board);
  return (
    <>
      <p className="game-instance-title">Board Preview</p>
      <br />
      {board.map((row: string[], idx: number) => {
        return (
          <div className="game-board-row" key={idx + 500}>
            {row.map((space, idx) => {
              return (
                <div className="game-board-space" key={idx + 300}>
                  {space}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
