import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import axios from 'axios';

export const loadGameBoard: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const name = params.name;
  const gameID = localStorage.getItem('gameID');

  try {
    const res = await axios.get(
      `http://localhost:3333/api/v1/games/${name}/play/board`,
      {
        headers: {
          gameID: gameID,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
