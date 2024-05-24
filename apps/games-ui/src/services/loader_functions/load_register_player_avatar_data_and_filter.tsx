import { IRegisterLoaderAndFilter } from '@aklapper/model';
import axios from 'axios';
import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { getGameInstanceInfo } from '../utils';

export const loadPlayerAvatarRegisterFilterData: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const baseURL = import.meta.env.VITE_API_SERVER_URL;
  const id = params.id;

  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  try {
    const resp = await axios.patch(
      `${baseURL}/games/${id}/load-register`,
      {},
      {
        headers: {
          __current_game__: __current_game__,
        },
      }
    );
    sessionStorage.setItem('__current_game__', resp.headers.__current_game__);

    if (resp.data.errorMessage) {
      const errorMessage = {
        errorMessage: resp.data.errorMessage,
      };
      return errorMessage;
    } else {
      const returnGameFunctionalityLoaderData: IRegisterLoaderAndFilter = {
        gamePlayerIDs: JSON.parse(resp.headers.__current_game__),
        avatarList: resp.data.avatarList,
        avatarColorList: resp.data.avatarColorList,
      };

      return returnGameFunctionalityLoaderData;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
