import { useLoaderData } from 'react-router-dom';

interface IInstanceOfGameClient {
  game: string[][];
  activeGameID: string;
  instanceTime: number;
  lastActive: number;
}

const GameInstance = () => {
  const gameData = useLoaderData() as IInstanceOfGameClient;
  console.log(gameData.game);

  const X = () => {
    return gameData.game.map((row, idx) => {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            border: '3px solid white',
          }}
          key={idx + 500}
        >
          {row.map((space, idx) => {
            return (
              <div
                style={{ width: 'fit-content', border: '3px solid red' }}
                key={idx + 300}
              >
                {space}
              </div>
            );
          })}
        </div>
      );
    });
  };
  return (
    <div style={{ paddingLeft: '220px' }} className="game-instance-container">
      <X />
    </div>
  );
};

export default GameInstance;
