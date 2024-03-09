import { useNavigate, useLocation } from 'react-router-dom';

const GameInstance = () => {
  const location = useLocation();
  const nav = useNavigate();

  const gameInstanceID = location.state.gameID;
  const pathToShow = location.pathname;

  const handleShowGameBoard = () => {
    nav(`${gameInstanceID}`);
  };

  return (
    <div className="game-instance-container">
      <h1 className="game-instance-title">Click to show board:</h1>
      <br />
      <p className="game-instance-click" onClick={handleShowGameBoard}>
        CLICK TO SHOW BOARD
      </p>
      <br />
      <p className="game-instance-link-title">Link to Share:</p>
      <br />
      <p className="game-instance-link">{`http://localhost:4200${pathToShow}/${gameInstanceID}`}</p>
    </div>
  );
};

export default GameInstance;
