import React from 'react';
import Timezones from '@/lib/completeTimezones.json';
import { formatDate } from '@/helpers/formatDate';
import { IMentorship } from '@/interfaces/mentorship.interface';
import { CalendarIcon, UserRemoveIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';

import Link from 'next/link';
interface IMentorshipCard {
  mentorship: IMentorship;
  handleCancelMentorship?: () => void;
}

const MentorshipCard: React.FC<IMentorshipCard> = ({
  mentorship,
  handleCancelMentorship,
}) => {
  const getTimezone = () => {
    const timezone = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split('/')
      .at(-1);
    return (
      timezone && Timezones.find(tz => tz.tzCode.includes(timezone))?.tzCode
    );
  };

  const formatedStartDatetime = dayjs(mentorship.time_slot_info?.date)
    .toISOString()
    .replace(/[-:.]/g, '');

  const formatedEndDatetime = dayjs(mentorship.time_slot_info?.date)
    .add(45, 'minute')
    .toISOString()
    .replace(/[-:.]/g, '');

  const formatedMenteeUsername = mentorship.mentee_username_discord.replace(
    '#',
    '%23',
  );

  const googleCalendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mentoría con ${formatedMenteeUsername} - FrontendCafé&dates=${formatedStartDatetime}/${formatedEndDatetime}&details=${
    mentorship.info
  }&location=FrontendCafé Discord&trp=true&ctz=${getTimezone()}`;

  return (
    <div key={mentorship.id} className="px-4 pb-5 sm:px-6">
      <div className="flex border-t border-b border-r border-green-500 rounded-lg">
        <div className="bg-green-500 flex-shrink-0 flex items-center justify-center w-14 text-cardContentLight text-sm font-medium rounded-l-md">
          <CalendarIcon style={{ padding: 12 }} />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-center p-3">
            <p className="text-sm font-medium text-mainTextColor">
              {mentorship.time_slot_info &&
                formatDate(mentorship.time_slot_info.date)}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-mainTextColor">Mentee:</span>{' '}
              {mentorship.mentee_username_discord}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-mainTextColor">ID:</span>{' '}
              {mentorship.mentee_id}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-mainTextColor">Email:</span>{' '}
              {mentorship.mentee_email}
            </p>
          </div>
          <div className="flex max-w-2xl p-3">
            <p className="text-sm text-left text-gray-300">
              <span className="font-medium text-mainTextColor">
                Información:
              </span>{' '}
              {mentorship.info}
            </p>
          </div>
          <div className="flex p-3 ">
            <div className="flex items-center justify-center pt-1 my-auto mr-2">
              <div className="has-tooltip">
                <span className="px-2 py-1 -mt-8 -ml-20 text-sm text-green-500 bg-gray-700 rounded shadow-lg tooltip">
                  Agregar a Google Calendar
                </span>
                <Link href={googleCalendarURL}>
                  <a
                    target="_blank"
                    className="text-mainTextColor hover:text-mainBtnColor"
                  >
                    <CalendarIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </Link>
              </div>
              {handleCancelMentorship && (
                <div className="has-tooltip">
                  <span className="px-2 py-1 -mt-8 text-sm text-red-500 bg-gray-700 rounded shadow-lg -ml-14 tooltip">
                    Cancelar mentoría
                  </span>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-2 py-2 -ml-px text-5xl text-red-500 bg-transparent outline-none hover:text-red-800"
                    onClick={handleCancelMentorship}
                  >
                    <UserRemoveIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipCard;
