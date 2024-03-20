import { useLoaderData } from 'react-router-dom';
import { IGame } from '@aklapper/model';
import PlayGame from './play_game';



const GameDetails = () => {
  const loader = useLoaderData() as IGame;

  const gameDetails = loader.rules;
  const name = loader.name as string;
  return (
    <div className="game-details-container">
      <h4 className="game-details-name">{name}</h4>
      <ul className="game-details-ul">
        {gameDetails.map((d) => (
          <div className="game-details-li-div" key={d.order + 5}>
            <li className="game-details-title">{d.title}</li>
            <div className="game-details-value-div">
              <li className="game-details-value">{d.value}</li>
            </div>
          </div>
        ))}
      </ul>
      <PlayGame />
    </div>
  );
};

export default GameDetails;
