import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface InputProps {
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  option?: boolean;
  type?: string;
  className?: string;
  value?: string;
}

const Input = ({
  placeholder,
  name,
  onChange,
  className = '',
  label = '',
  option = false,
  type = 'text',
  value = '',
}: InputProps) => {
  return (
    <div>
      {label && (
        <label className={classNames('text-sm', className)} htmlFor={name}>
          {label}
          {option && <span className="text-red-500 ">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className={classNames('w-full border p-2 rounded-md mt-1', className)}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
