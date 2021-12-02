import React from 'react';

interface ICustomButton {
  type?: 'button' | 'submit' | 'reset' | undefined;
  bntLabel: string;
  bntIcon?: React.ReactNode;
  primary: boolean;
  clickAction?: () => void;
  className?: string;
  disabled?: boolean;
  danger?: boolean;
}

const CustomButton: React.FC<ICustomButton> = ({
  bntLabel,
  bntIcon,
  clickAction,
  type = 'button',
  primary = true,
  className = null,
  disabled = false,
  danger = false,
}) => {
  return (
    <button
      type={type}
      className={`${className} inline-flex items-center px-3 py-2 text-sm font-medium leading-4 border border-transparent rounded-md shadow-sm focus:outline-none ${
        primary && !disabled
          ? 'text-mainBtnTxt bg-mainBtnColor hover:bg-mainBtnHoverColor'
          : !danger && !primary && !disabled
          ? 'text-black bg-secondaryBtnColor hover:bg-secondaryBtnHoverColor'
          : disabled
          ? 'text-mainBtnTxt bg-gray-600 cursor-not-allowed'
          : danger
          ? 'text-mainBtnTxt bg-red-600 hover:bg-red-700'
          : null
      }
      `}
      onClick={clickAction ? clickAction : () => {}}
      disabled={disabled}
    >
      {bntIcon}
      {bntLabel}
    </button>
  );
};

export default CustomButton;
