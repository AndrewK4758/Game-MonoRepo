import { IGame } from '@aklapper/model';
import { useLoaderData, useNavigate, Outlet } from 'react-router-dom';

const GamesList = () => {
  const games = useLoaderData() as IGame[];
  const nav = useNavigate();

  const handleClick = (e: React.BaseSyntheticEvent) => {
    const id = e.target.value;
    nav(`${id}`);
  };

  return (
    <div className="games-list">
      <h2 className="games-title">Games</h2>
      <ul className="games-ul">
        {games.map((g) => (
          <div className="games-li-container" key={g.id}>
            <li
              className="games-li"
              value={g.id}
              onClick={(e) => handleClick(e)}
            >
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
