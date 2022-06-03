import React from 'react';

interface IStatusLabelCard {
  title: string;
  bgColor: string;
}

const StatusLabelCard = ({ title, bgColor }: IStatusLabelCard) => (
  <div
    className={`w-[6.5rem] h-5 mt-2 rounded flex items-center justify-center ${bgColor}`}
  >
    <span className="text-[0.6rem]">{title}</span>
  </div>
);

export default StatusLabelCard;
