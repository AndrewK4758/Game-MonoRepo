import { IGame } from '@aklapper/model';
import { Form, useLoaderData } from 'react-router-dom';

const PlayGame = () => {
  const loader = useLoaderData() as IGame;

  const name = loader.name;
  return (
    <div className="play-game-button-div">
      <Form method="post" action={`/games/${name}`}>
        <button
          className="play-game-button"
          name="name"
          value={name}
          type="submit"
        >
          PLAY GAME!!
        </button>
      </Form>
    </div>
  );
};

export default PlayGame;
