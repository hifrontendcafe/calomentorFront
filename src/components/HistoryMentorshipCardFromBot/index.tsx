import { formatDate } from '@/helpers/formatDate';
import { IMentorship } from '@/interfaces/mentorship.interface';
import { ChevronRightIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import classNames from 'classnames';

interface IMentorshipCard {
  mentorship: IMentorship;
}

interface CardEventTarget extends EventTarget {
  id?: string;
}

interface CardMouseEvent extends React.MouseEvent<HTMLElement> {
  target: CardEventTarget;
}

const MentorshipCardFromBot: React.FC<IMentorshipCard> = ({
  mentorship: {
    id,
    mentee_id,
    mentee_username_discord,
    mentor_username_discord,
    mentorship_create_date,
    mentor_id,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = String(mentorship_create_date);
  return (
    <div key={id} className="px-4 my-4 sm:px-6">
      <div className="overflow-hidden border-2 border-gray-700 border-solid sm:rounded-lg">
        <div
          className="flex flex-row items-center justify-between px-2 py-3 cursor-pointer sm:px-6 text-mainTextColor hover:bg-cardHeader"
          onClick={(e: CardMouseEvent) => {
            if (e.target.id !== 'warnButton') {
              setIsOpen(!isOpen);
            }
          }}
        >
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-200">
              {mentee_username_discord}
            </h3>
            <p className="max-w-2xl mt-1 text-sm">
              {mentorship_create_date &&
                `Cargada el ${formatDate(
                  Number(Number(date.length === 16 ? date.slice(0, -3) : date)),
                )}`}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <ChevronRightIcon
              className={classNames('w-5 h-5 transform transition-transform', {
                'rotate-90': isOpen,
              })}
            />
          </div>
        </div>
        <div
          className={classNames(
            'px-4 py-5 transition-all transform ease-in-out origin-top border-t border-gray-700 xm:px-6',
            {
              block: isOpen,
              hidden: !isOpen,
            },
          )}
        >
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-mainTextColor">
                Mentee: Discord ID - Usuario
              </dt>
              <dd className="mt-1 text-sm text-gray-200">
                {mentee_id} - {mentee_username_discord}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-mainTextColor">
                Mentor: Discord ID - Usuario
              </dt>
              <dd className="mt-1 text-sm text-gray-200">
                {mentor_id} - {mentor_username_discord}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MentorshipCardFromBot;
