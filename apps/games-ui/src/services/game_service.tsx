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
  const name = params.name;
  const res = await axios.get(`http://localhost:3333/api/v1/games/${name}`);
  const detailsAndIDtoSend = {
    name: res.data.name,
    rules: res.data.rules,
  };
  return detailsAndIDtoSend;
};

const createGameInstance: LoaderFunction = async ({ params }: LoaderParam) => {
  const gameID = params.gameID;
  const name = params.name;
  const res = await axios.get(
    `http://localhost:3333/api/v1/games/${name}/play/${gameID}`
  );
  return res;
};

export { getGameList, getGameDetails, createGameInstance };
