import { formatDate } from '@/helpers/formatDate';
import { IMentorship } from '@/interfaces/mentorship.interface';
import {
  BanIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from '@heroicons/react/outline';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Star from '@/assets/img/Star.svg';
import Image from 'next/image';
import classNames from 'classnames';
import { WARNSTATE } from '@/interfaces/warning.interface';
import { getMentorshipStatus } from '@/helpers/getMentorshipStatus';

interface IMentorshipCard {
  mentorship: IMentorship;
  setModalData: Dispatch<
    SetStateAction<{
      mentee_name: string;
      menteeId: string;
      mentorshipId: string;
    }>
  >;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  isAdmin?: boolean;
}

interface CardEventTarget extends EventTarget {
  id?: string;
}

interface CardMouseEvent extends React.MouseEvent<HTMLElement> {
  target: CardEventTarget;
}

const MentorshipCard: React.FC<IMentorshipCard> = ({
  mentorship: {
    id,
    time_slot_info,
    mentee_id,
    mentee_email,
    cancel_cause,
    mentee_name,
    mentorship_status,
    who_canceled,
    mentor_name,
    feedback_stars,
    feedback_mentee,
    mentee_username_discord,
    warning_info,
    info,
    feedback_mentee_private,
  },
  setModalData,
  setModalIsOpen,
  isAdmin = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCancelled = mentorship_status === 'CANCEL';
  const cancelledBy = who_canceled === 'MENTOR' ? mentor_name : mentee_name;
  const isWarned = warning_info && Object.keys(warning_info).length > 0;

  return (
    <div key={id} className="px-4 my-4 sm:px-6">
      <div className="overflow-hidden border-2 border-gray-700 border-solid sm:rounded-lg">
        <div
          className="flex flex-row items-center justify-between px-2 py-3 cursor-pointer sm:px-6 text-secondary hover:bg-cardHeader"
          onClick={(e: CardMouseEvent) => {
            if (e.target.id !== 'warnButton') {
              setIsOpen(!isOpen);
            }
          }}
        >
          <div className="text-primary">
            <h3 className="text-lg font-medium leading-6 text">
              {mentee_name}
            </h3>
            <p className="max-w-2xl mt-1 text-sm">
              {time_slot_info && formatDate(time_slot_info.date)} | Estado:{' '}
              {getMentorshipStatus(mentorship_status)}
            </p>
          </div>
          <div className="flex flex-row items-center">
            {Array.from({ length: feedback_stars }, () => (
              <div className="flex items-center mr-2">
                <Image src={Star} width="20px" height="20px" alt="Star" />
              </div>
            ))}
            {!isWarned && (
              <div className="has-tooltip">
                <span className="px-2 py-1 -mt-8 -ml-10 text-sm text-red-500 bg-gray-700 rounded shadow-lg tooltip">
                  Advertir usuario
                </span>
                <ExclamationIcon
                  id="warnButton"
                  className="w-5 h-5 mx-2 text-red-400 cursor-pointer hover:text-red-600"
                  onClick={() => {
                    setModalData({
                      mentee_name,
                      menteeId: mentee_id,
                      mentorshipId: id,
                    });
                    setModalIsOpen(true);
                  }}
                />
              </div>
            )}
            {isWarned && warning_info?.warning_status === WARNSTATE.ACTIVE && (
              <div className="has-tooltip">
                <span className="px-2 py-1 -mt-8 text-sm text-red-500 bg-gray-700 rounded shadow-lg -ml-14 tooltip">
                  El usuario fue advertido
                </span>
                <BanIcon className="w-5 h-5 mx-2 text-red-400" />
              </div>
            )}
            {isWarned && warning_info?.warning_status === WARNSTATE.FORGIVE && (
              <div className="has-tooltip">
                <span className="px-2 py-1 -mt-8 text-sm text-yellow-500 bg-gray-700 rounded shadow-lg -ml-14 tooltip">
                  El usuario fue perdonado
                </span>
                <ExclamationCircleIcon className="w-5 h-5 mx-2 text-yellow-400" />
              </div>
            )}
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
              <dt className="text-sm font-medium text-primary">
                Discord ID - Usuario
              </dt>
              <dd className="mt-1 text-sm text-secondary">
                {mentee_id} - {mentee_username_discord}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-primary">Email</dt>
              <dd className="mt-1 text-sm text-secondary">{mentee_email}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-primary">Información</dt>
              <dd className="mt-1 text-sm text-secondary">{info}</dd>
            </div>
            {feedback_mentee && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-primary">Feedback</dt>
                <dd className="mt-1 text-sm text-secondary">
                  {feedback_mentee}
                </dd>
              </div>
            )}
            {isAdmin && feedback_mentee_private && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-primary">
                  Feedback Privado
                </dt>
                <dd className="mt-1 text-sm text-secondary">
                  {feedback_mentee_private}
                </dd>
              </div>
            )}
            {isWarned && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-primary">
                  Causa de la advertencia
                </dt>
                <dd className="mt-1 text-sm text-secondary">
                  {warning_info?.warn_cause
                    ? warning_info?.warn_cause
                    : 'Ausencia'}
                </dd>
              </div>
            )}
            {isWarned && warning_info?.warning_status === 'FORGIVE' && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-primary">
                  Perdonado por:
                </dt>
                <dd className="mt-1 text-sm text-secondary">
                  {warning_info?.forgive_cause}
                </dd>
              </div>
            )}
            {isCancelled && (
              <>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-primary">
                    Cancelado por:
                  </dt>
                  <dd className="mt-1 text-sm text-secondary">{cancelledBy}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-primary">
                    Causa de cancelación:
                  </dt>
                  <dd className="mt-1 text-sm text-secondary">
                    {cancel_cause}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MentorshipCard;
