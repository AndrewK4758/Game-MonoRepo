import { useLoaderData } from 'react-router-dom';
import RegisterPlayerAndAvatarForm from '../components/formik_form_components/register_player_and_avatar_formik';
import { RegisterAndPlayData } from '@aklapper/model';

export default function RegisterPlayerAndGameID() {
  const loader = useLoaderData() as RegisterAndPlayData;
  const gameID = loader.gameID;

  return (
    <div className="game-instance-container">
      <h1 className="game-instance-title">Current game info:</h1>
      <br />
      <p className="game-instance-id">{`Game ID: ${gameID}`}</p>
      <br />
      <p className="game-instance-title">Register Info:</p>
      <br />
      <RegisterPlayerAndAvatarForm />
    </div>
  );
}

/* 

*/
