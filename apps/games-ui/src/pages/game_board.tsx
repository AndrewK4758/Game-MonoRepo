import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function GameBoard() {
  const loader = useLoaderData() as AxiosResponse;

  const board = loader.data.game;
  if (board) {
    const ShowBoard = () => {
      return board.map((row: string[], idx: number) => {
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
      });
    };
    return (
      <div className="game-board-container">
        <ShowBoard />
      </div>
    );
  } else {
    const error = loader.data.message as ReactNode;
    return (
      <>
        {'Error:'}
        <br />
        {error}
      </>
    );
  }
}
