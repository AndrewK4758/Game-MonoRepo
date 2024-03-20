import { LoaderFunction } from 'react-router-dom';
import axios from 'axios';

export const getGameList: LoaderFunction = async () => {
  const res = await axios.get('http://localhost:3333/api/v1/games');
  return res.data;
};
