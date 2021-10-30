import React from 'react';

interface ICustomButton {
  type?: 'button' | 'submit' | 'reset' | undefined;
  bntLabel: string;
  bntIcon?: React.ReactNode;
  primary: boolean;
  clickAction?: () => void;
  className?: string;
}

const CustomButton: React.FC<ICustomButton> = ({
  bntLabel,
  bntIcon,
  clickAction,
  type = 'button',
  primary = true,
  className = null,
}) => {
  return (
    <button
      type={type}
      className={`${className} inline-flex items-center px-3 py-2 text-sm font-medium leading-4 border border-transparent rounded-md shadow-sm ${
        primary
          ? 'text-mainBtnTxt bg-mainBtnColor hover:bg-mainBtnHoverColor'
          : 'text-black bg-secondaryBtnColor hover:bg-secondaryBtnHoverColor'
      } focus:outline-none`}
      onClick={clickAction ? clickAction : () => {}}
    >
      {bntIcon}
      {bntLabel}
    </button>
  );
};

export default CustomButton;
