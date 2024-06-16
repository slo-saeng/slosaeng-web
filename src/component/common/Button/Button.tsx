import classNames from 'classnames';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = ({ text, className, onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        'w-full p-2 text-white rounded-md bg-main-point hover:bg-main-point-dark',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  onClick: null,
  disabled: false,
};

export default Button;
