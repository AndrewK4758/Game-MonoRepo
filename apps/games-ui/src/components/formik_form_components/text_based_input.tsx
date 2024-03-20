import { useField } from 'formik';

interface ITextBasedInput {
  name: string;
  type: string;
  label: string;
  id?: string;
  placeholder?: string;
}

export default function TextBasedInput({ label, ...props }: ITextBasedInput) {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name} className={`text-input-label-${props.name}`}>
        {label}
      </label>
      <br />
      <input className={`text-input-${props.name}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}
