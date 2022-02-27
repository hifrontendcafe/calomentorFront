import { ChevronRightIcon } from '@heroicons/react/outline';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IWarning, WARN, WARNSTATE } from '@/interfaces/warning.interface';
import dayjs from 'dayjs';
import classNames from 'classnames';

interface IWarningCard {
  warning: IWarning;
  setModalData?: Dispatch<
    SetStateAction<{
      mentee_name: string;
      menteeId: string;
      mentorshipId: string;
    }>
  >;
  setModalIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface CardEventTarget extends EventTarget {
  id?: string;
}

interface CardMouseEvent extends React.MouseEvent<HTMLElement> {
  target: CardEventTarget;
}

const WarningCard: React.FC<IWarningCard> = ({
  warning: {
    id,
    // mentee_id,
    // mentorship_id,
    warning_author_name,
    mentee_name,
    mentor_name,
    warning_status,
    warn_cause,
    warn_type,
    warning_author_id,
    warning_date,
    forgive_cause,
  },
  setModalData,
  setModalIsOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isForgived = warning_status === WARNSTATE.FORGIVE;
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
              Autor: {warning_author_name} | Estado:{' '}
              {isForgived ? 'Perdonado' : 'Activo'}
            </h3>
            <p className="max-w-2xl mt-1 text-sm">
              Fecha: {dayjs(warning_date).toString()}
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
                Mentor:
              </dt>
              <dd className="mt-1 text-sm text-gray-200">{mentor_name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-mainTextColor">
                Mentee:
              </dt>
              <dd className="mt-1 text-sm text-gray-200">{mentee_name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-mainTextColor">
                Tipo de warning
              </dt>
              <dd className="mt-1 text-sm text-gray-200">
                {warn_type === WARN.COC_WARN
                  ? 'Incumplimiento del código de conducta'
                  : 'Ausencia'}
              </dd>
            </div>
            {warn_type === WARN.COC_WARN && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-mainTextColor">
                  Causa
                </dt>
                <dd className="mt-1 text-sm text-gray-200">{warn_cause}</dd>
              </div>
            )}
            {isForgived && (
              <>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-mainTextColor">
                    Perdonado por:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-200">
                    {warning_author_id}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-mainTextColor">
                    Warn remove cause :
                  </dt>
                  <dd className="mt-1 text-sm text-gray-200">
                    {forgive_cause}
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

export default WarningCard;
