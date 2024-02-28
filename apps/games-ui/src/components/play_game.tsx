import { useNavigate } from 'react-router-dom';

const PlayGame = () => {
  const nav = useNavigate();
  const handlePlayGame = () => {
    nav('instances');
  };
  return (
    <div style={{ paddingLeft: '300px' }} className="play-game-button-div">
      <button className="play-game-button" onClick={handlePlayGame}>
        PLAY GAME!!
      </button>
    </div>
  );
};

export default PlayGame;
