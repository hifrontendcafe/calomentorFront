import React from 'react';
import Indicator from '@/components/Indicator';
import ChartYear from '@/components/ChartYear';
import ChartMonth from '@/components/ChartMonth';

const InfoCard: React.FC<{
  data: any;
  dataOfTheDay: number;
  dataOfTheWeek: number;
  dataOfTheMonth: number;
  dataOfTheYear: number;
  total: number;
  label: string;
}> = ({
  data,
  dataOfTheDay,
  dataOfTheWeek,
  dataOfTheMonth,
  dataOfTheYear,
  total,
  label,
}) => {
  return (
    <div className="flex flex-col space-y-8">
      <h2 className="text-3xl font-semibold">{label}</h2>
      <div className="flex justify-between gap-5 w-full">
        <Indicator value={dataOfTheDay} label="hoy" />
        <Indicator value={dataOfTheWeek} label="esta semana" />
        <Indicator value={dataOfTheMonth} label="este mes" />
        <Indicator value={dataOfTheYear} label="este año" />
      </div>
      <div className="grid grid-cols-12 items-center bg-cardContent rounded-lg h-44 w-full">
        <h3 className="flex flex-col items-center justify-center gap-2 w-full col-span-6 font-bold">
          <span className="text-3xl">{total}</span>
          {`${label} totales`}
        </h3>
        <ChartYear data={data} />
      </div>

      <div className="p-4 w-full bg-cardContent rounded-lg">
        <h3 className="mb-4 text-xl font-medium text-mainTextColor">
          {`${label} mensuales`}
        </h3>
        <ChartMonth data={data} />
      </div>
    </div>
  );
};

export default InfoCard;
