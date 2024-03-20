import { RegisterAndPlayData } from '@aklapper/model';
import { useField } from 'formik';
import { useRouteLoaderData } from 'react-router-dom';

interface IAvatarColorSelectValues {
  name: string;
  label: string;
  id?: string;
}

export default function SelectAvatarColor({
  label,
  ...props
}: IAvatarColorSelectValues) {
  const data = useRouteLoaderData('register') as RegisterAndPlayData;
  const [field, meta] = useField(props);

  const colors = data.avatarColorList;

  const AvatarColors = () => {
    return Object.values(colors).map((c, i) => (
      <option key={i} value={c}>
        {c}
      </option>
    ));
  };

  return (
    <div>
      <br />
      <label className="select-input-label-avatarColor">{label}</label>
      <br />
      <select className="select-input-avatarColor" {...field} {...props}>
        <option> </option>
        <AvatarColors />
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
