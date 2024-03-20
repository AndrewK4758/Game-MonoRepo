import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import axios from 'axios';
import { RegisterAndPlayData } from '@aklapper/model';

export const returnPlayerAvatarRegisterFunctionality: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const gameID = localStorage.getItem('gameID');
  const name = params.name;
  const res = await axios.get(
    `http://localhost:3333/api/v1/games/${name}/play`,
    {
      headers: {
        gameID: gameID,
      },
    }
  );

  const returnGameFunctionalityLoaderData: RegisterAndPlayData = {
    gameID: res.data.gameID,
    avatarList: res.data.avatarList,
    avatarColorList: res.data.avatarColorList,
  };
  return returnGameFunctionalityLoaderData;
};
