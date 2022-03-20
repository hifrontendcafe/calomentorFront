import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

interface INotificationToast {
  title: string;
  subtext?: string;
  type: 'info' | 'error' | 'default';
}

export const NotificationToast: React.FC<INotificationToast> = ({
  title,
  subtext,
  type,
}) => {
  const [show, setShow] = useState(true);

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="overflow-hidden bg-gray-800 border rounded-lg shadow-lg pointer-events-auto w-96 border-cardContent">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {type === 'info' ? (
                <InformationCircleIcon
                  className="w-6 h-6 text-yellow-400"
                  aria-hidden="true"
                />
              ) : type === 'error' ? (
                <ExclamationCircleIcon
                  className="w-6 h-6 text-red-400"
                  aria-hidden="true"
                />
              ) : (
                <CheckCircleIcon
                  className="w-6 h-6 text-green-400"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-mainTextColor">{title}</p>
              {subtext && (
                <p className="mt-1 text-sm text-gray-200">{subtext}</p>
              )}
            </div>
            <div className="flex flex-shrink-0 ml-4">
              <button
                className="inline-flex text-gray-400 rounded-md hover:text-gray-500 focus:outline-none"
                onClick={() => setShow(false)}
              >
                <span className="sr-only">Cerrar</span>
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
