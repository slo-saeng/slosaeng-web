import React from 'react';
import ButtonCard from '../../main/ButtonCard/ButtonCard';

interface ButtonCardWithClickProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

const ButtonCardWithClick = ({
  icon,
  text,
  onClick,
  isSelected,
}: ButtonCardWithClickProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer ${isSelected ? 'bg-main-point border-4 border-main-point' : ''}`}
    >
      <ButtonCard icon={icon} text={text} />
    </div>
  );
};

export default ButtonCardWithClick;
