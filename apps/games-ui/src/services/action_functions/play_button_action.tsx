import { ActionFunctionArgs, ActionFunction, redirect } from 'react-router-dom';
import axios from 'axios';

export const playGameButtonAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await request.formData();

  const name = data.get('name');

  try {
    const res = await axios.post(`http://localhost:3333/api/v1/games/${name}`);

    const gameID = res.data.gameID;
    localStorage.setItem('gameID', gameID);
    return redirect('play');
  } catch (error) {
    console.log(error);
  }
};
