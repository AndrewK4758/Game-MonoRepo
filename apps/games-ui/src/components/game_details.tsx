import { useLoaderData } from 'react-router-dom';
import { IGame } from '@aklapper/model';

const GameDetails = () => {
  const gameDetails = useLoaderData() as IGame;

  return (
    <div className="game-details-container">
      <h4 className="game-details-name">{gameDetails.name}</h4>
      <ul className="game-details-ul">
        {gameDetails.rules.map((d) => (
          <div className="game-details-li-div" key={d.order + 5}>
            <li className="game-details-title">{d.title}</li>
            <div className="game-details-value-div">
              <li className="game-details-value">{d.value}</li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GameDetails;
