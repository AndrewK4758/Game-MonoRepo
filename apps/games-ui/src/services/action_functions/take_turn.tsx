import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import { getGameInstanceInfo } from '../utils';

export const takeTurn = async ({ params }: ActionFunctionArgs) => {
  const __baseURL__ = import.meta.env.VITE_API_SERVER_URL;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());
  const id = params.id;

  try {
    const resp = await axios.patch(
      `${__baseURL__}/games/${id}/take-turn`,
      {},
      { headers: { __current_game__: __current_game__ } }
    )
    console.log(resp.data.message)

    return null
  } catch (error) {
    console.log(error);
    return null
  }
};