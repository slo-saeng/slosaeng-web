import { ChangeEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const PasswordInput = ({
  value,
  onChange,
  placeholder,
  name,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <div
        className="absolute inset-y-0 flex items-center px-3 text-gray-400 cursor-pointer right-2"
        onClick={togglePasswordVisibility}
        onKeyPress={togglePasswordVisibility}
        tabIndex={0}
        role="button"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  );
};
