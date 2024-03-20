import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextBasedInput from './text_based_input';
import './style.form.css';
import SelectAvatar from './select_avatar';
import SelectAvatarColor from './select_avatar_color';
import { useParams, useSubmit } from 'react-router-dom';

export default function RegisterPlayerAndAvatarForm() {
  const params = useParams();
  const submit = useSubmit();

  const name = params.name;
  return (
    <div>
      <Formik
        initialValues={{ playerName: '', avatarName: '', avatarColor: '' }}
        validationSchema={Yup.object({
          playerName: Yup.string()
            .min(2, 'Must be min of 2 characters')
            .max(20, 'Must be 20 characters or less')
            .required('Required, please enter player name'),
          avatarName: Yup.string().required(
            'Required, please select avatar name'
          ),
          avatarColor: Yup.string().required(
            'Required, please select avatar color'
          ),
        })}
        onSubmit={(values) =>
          submit(values, {
            method: 'post',
            action: `/games/${name}/play`,
          })
        }
      >
        <Form>
          <TextBasedInput
            type="text"
            name="playerName"
            placeholder="Enter Player Name"
            label="Player Name"
          />
          <br />
          <SelectAvatar name="avatarName" label="Avatar Name" />
          <br />
          <SelectAvatarColor name="avatarColor" label="Avatar Color" />
          <br />
          <button type="submit" className="register-form-submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
