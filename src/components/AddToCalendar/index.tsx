/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { format, addMinutes } from 'date-fns';
import CalendarIcon from '@/assets/img/icon-calendar-t1.svg';
import Image from 'next/image';

declare global {
  interface Window {
    addeventatc: any;
  }
}

interface ICalendarEvent {
  event: {
    title: string;
    description: string;
    location: string;
    startTime: number;
    tz: string;
  };
}

const AddToCalendar: React.FC<ICalendarEvent> = ({ event }) => {
  useEffect(() => {
    window.addeventatc.settings({
      appleical: { show: true, text: 'Apple Calendar' },
      google: { show: true, text: 'Google <em>(online)</em>' },
      office365: { show: false },
      outlook: { show: false },
      outlookcom: { show: true, text: 'Outlook.com <em>(online)</em>' },
      yahoo: { show: false },
    });
    window.addeventatc.refresh();
  });

  let endDate = new Date(event.startTime);
  endDate = addMinutes(endDate, 45);
  return (
    <button title="Add to Calendar" className="addeventatc" data-styling="none">
      <Image
        src={CalendarIcon}
        alt="calendar icon"
        width="18px"
        height="18px"
      />
      <span className="start">
        {format(new Date(event.startTime), 'MM/dd/yyyy HH:mm')}
      </span>
      <span className="end">{format(endDate, 'MM/dd/yyyy HH:mm')}</span>
      <span className="timezone">{event.tz}</span>
      <span className="title">{event.title}</span>
      <span className="description">{event.description}</span>
      <span className="location">{event.location}</span>
    </button>
  );
};

export default AddToCalendar;
