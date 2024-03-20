import { RegisterAndPlayData } from '@aklapper/model';
import { useRouteLoaderData } from 'react-router-dom';
import { useField } from 'formik';

interface IAvatarSelectValues {
  name: string;
  label: string;
  id?: string;
}

export default function SelectAvatar({ label, ...props }: IAvatarSelectValues) {
  const data = useRouteLoaderData('register') as RegisterAndPlayData;
  const [field, meta] = useField(props);

  const avatars = data.avatarList;

  const AvatarNames = () =>
    avatars.map((a) => (
      <option key={a.id} value={a.name}>
        {a.name}
      </option>
    ));
  return (
    <div>
      <br />
      <label className="select-input-label-avatarName">{label}</label>
      <br />
      <select className="select-input-avatarName" {...field} {...props}>
        <option> </option>
        <AvatarNames />
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
