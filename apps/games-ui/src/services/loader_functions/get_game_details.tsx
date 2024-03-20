import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import axios from 'axios';

export const getGameDetails: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const name = params.name;
  const res = await axios.get(`http://localhost:3333/api/v1/games/${name}`);
  const detailsAndIDtoSend = {
    name: res.data.name,
    rules: res.data.rules,
  };
  return detailsAndIDtoSend;
};
