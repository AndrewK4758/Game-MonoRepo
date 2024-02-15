import axios from 'axios';
import { LoaderFunction, LoaderFunctionArgs, Params } from 'react-router-dom';

const getGameList: LoaderFunction = async () => {
  const res = await axios.get('http://localhost:3333/api/v1/games');
  return res.data;
};

interface LoaderParam extends LoaderFunctionArgs {
  params: Params;
}

const getGameDetails: LoaderFunction = async ({ params }: LoaderParam) => {
  const id = params.id;
  const res = await axios.get(`http://localhost:3333/api/v1/games/${id}`);
  return res.data;
};

export { getGameList, getGameDetails };
