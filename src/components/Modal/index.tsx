import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';
import type { IconType } from 'react-icons/lib';
import { Dialog, Transition } from '@headlessui/react';
import CustomButton from '../CustomButton';
import classNames from 'classnames';

interface IModal {
  title?: string;
  children?: ReactNode;
  childrenClassName?: string;
  danger?: boolean;
  isOpen: boolean;
  Icon?: IconType;
  iconClassName?: string;
  iconContainerClassName?: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  confirmAction?: () => void;
  renderButtons?: boolean;
}

const Modal: React.FC<IModal> = ({
  title,
  children,
  childrenClassName,
  isOpen,
  Icon,
  iconContainerClassName,
  iconClassName,
  onOpenChange,
  confirmAction,
  danger = false,
  renderButtons = true,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onOpenChange}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-cardContent rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                {Icon && (
                  <div
                    className={classNames(
                      'flex items-center justify-center w-12 h-12 mx-auto rounded-full',
                      iconContainerClassName,
                    )}
                  >
                    <Icon size={30} className={iconClassName} />
                  </div>
                )}
                <div className="mt-3 text-center">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className={classNames(
                        'text-lg font-medium leading-6 my-2',
                        {
                          'text-mainTextColor': !danger,
                          'text-red-500': danger,
                        },
                      )}
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {children && (
                    <div
                      className={classNames(
                        'mt-2 text-gray-300',
                        childrenClassName,
                      )}
                    >
                      {children}
                    </div>
                  )}
                </div>
              </div>
              {renderButtons && (
                <div className="mt-5 flex flex-row gap-2 justify-end">
                  <CustomButton
                    bntLabel="Cancelar"
                    primary={false}
                    clickAction={() => onOpenChange(false)}
                  />
                  <CustomButton
                    bntLabel="Confirmar"
                    danger={danger}
                    primary
                    clickAction={confirmAction}
                  />
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
