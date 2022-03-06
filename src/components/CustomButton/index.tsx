import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface ICustomButton {
  type?: 'button' | 'submit' | 'reset' | undefined;
  bntLabel: string | ReactNode;
  bntIcon?: React.ReactNode;
  primary: boolean;
  clickAction?: () => void;
  className?: string;
  disabled?: boolean;
  danger?: boolean;
  isActive?: boolean;
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
  isActive = false,
}) => {
  return (
    <button
      type={type}
      className={classNames(
        'inline-flex items-center px-3 py-2 text-sm font-medium leading-4 border border-transparent rounded-md shadow-sm focus:outline-none',
        className,
        {
          'text-mainBtnTxt bg-mainBtnColor hover:bg-mainBtnHoverColor':
            primary && !disabled && !danger && !isActive,
          'text-mainBtnTxt bg-mainBtnHoverColor':
            primary && !disabled && !danger && isActive,
          'text-black bg-secondaryBtnColor hover:bg-secondaryBtnHoverColor':
            !danger && !primary && !disabled && !isActive,
          'text-mainBtnTxt bg-gray-600 cursor-not-allowed': disabled,
          'text-mainBtnTxt bg-red-600 hover:bg-red-700': danger,
        },
      )}
      onClick={() => clickAction?.()}
      disabled={disabled}
    >
      {bntIcon}
      {bntLabel}
    </button>
  );
};

export default CustomButton;
