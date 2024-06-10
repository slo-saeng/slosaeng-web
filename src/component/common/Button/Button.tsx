import classNames from 'classnames';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        'w-full p-2 text-white rounded-md bg-main-point hover:bg-main-point-dark',
        className,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  onClick: null,
};

export default Button;
