import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Props {
  name: ReactNode;
}
const PlayGame = ({ name }: Props) => {
  const nav = useNavigate();

  const handlePlayGame = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3333/api/v1/games/${name}`
      );
      const gameID = res.data.gameID;
      nav(`play`, {
        state: {
          gameID: gameID,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="play-game-button-div">
      <button className="play-game-button" onClick={handlePlayGame}>
        PLAY GAME!!
      </button>
    </div>
  );
};

export default PlayGame;
