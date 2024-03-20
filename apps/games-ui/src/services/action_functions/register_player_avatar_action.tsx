import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router-dom';
import axios from 'axios';

interface IRegisterFormValues {
  playerName: string;
  avatarName: string;
  avatarColor: string;
}

export const registerPlayerAndAvatarAction: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const name = params.name;
  const gameID = localStorage.getItem('gameID');

  const data = await request.formData();
  const avatarName = data.get('avatarName');
  const playerName = data.get('playerName');
  const avatarColor = data.get('avatarColor');

  const registerFormValues = {
    playerName: playerName,
    avatarName: avatarName,
    avatarColor: avatarColor,
  } as IRegisterFormValues;

  try {
    await axios.post(
      `http://localhost:3333/api/v1/games/${name}/play`,
      registerFormValues,
      {
        headers: {
          gameID: gameID,
        },
      }
    );

    return redirect('board');
  } catch (error) {
    console.log(error);
  }
};
