interface ButtonCardProps {
  icon: React.ReactNode;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonCard = ({ icon, text, onClick }: ButtonCardProps) => {
  return (
    <button
      type="button"
      className="flex flex-col p-20 space-y-4 border rounded-md p-30 place-items-center decoration-gray-400"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center p-8 rounded-full w-44 h-44 bg-main-point hover:bg-main-point-dark">
        {icon}
        <p className="mt-1 font-bold text-center break-keep">{text}</p>
      </div>
    </button>
  );
};

ButtonCard.defaultProps = {
  onClick: null,
};

export default ButtonCard;
