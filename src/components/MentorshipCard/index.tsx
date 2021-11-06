import React from 'react';
import Timezones from '@/lib/completeTimezones.json';
import AddToCalendar from '../AddToCalendar';
import { formatMentorshipDate } from '@/helpers/formatDate';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import { CalendarIcon, UserRemoveIcon } from '@heroicons/react/outline';

interface IMentorshipCard {
  mentorship: IMentorhip;
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

  const calendarEvent = {
    title: `Mentoría con ${mentorship.mentee_username_discord} - FrontendCafé`,
    description: mentorship.info,
    location: 'FrontendCafé Discord',
    startTime: mentorship.time_slot_info.date,
    tz: getTimezone() || '',
  };

  return (
    <div key={mentorship.id} className="px-4 pb-5 sm:px-6">
      <div className="flex border-t border-b border-r border-green-500 rounded-lg">
        <div
          className={`bg-green-500 flex-shrink-0 flex items-center justify-center w-14 text-cardContentLight text-sm font-medium rounded-l-md`}
        >
          <CalendarIcon style={{ padding: 12 }} />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-center p-3">
            <p className="text-sm font-medium text-mainTextColor">
              {formatMentorshipDate(mentorship.time_slot_info.date)}
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
            {handleCancelMentorship && (
              <>
                <div className="flex items-center justify-center pt-1 my-auto mr-2">
                  <AddToCalendar event={calendarEvent} />
                </div>
                <button
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 -ml-px text-5xl text-red-500 bg-transparent outline-none hover:text-red-800"
                  onClick={handleCancelMentorship}
                >
                  <UserRemoveIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipCard;
