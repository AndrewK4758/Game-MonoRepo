import { IGame } from '@aklapper/model';
import { useLoaderData, useNavigate, Outlet } from 'react-router-dom';

const GamesList = () => {
  const games = useLoaderData() as IGame[];
  const nav = useNavigate();

  const handleClick = (g: IGame) => {
    const name = g.name;
    nav(`${name}`);
  };

  return (
    <div className="games-list">
      <h2 className="games-title">Games - Thanks Walmart for the pics</h2>
      <ul className="games-ul">
        {games.map((g) => (
          <div className="games-li-container" key={g.name}>
            <img src={g.imageURL} alt="game pic" />
            <li className="games-li" onClick={() => handleClick(g as IGame)}>
              {g.name}
            </li>
          </div>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default GamesList;
