import React from 'react';

const Indicator: React.FC<{ value?: number | string; label: string }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col p-4 space-y text-center h-28 w-28 bg-cardContent rounded-lg">
    <p className="text-4xl">{value}</p>
    <p className="text-white text-opacity-60 text-xs">{label}</p>
  </div>
);

export default Indicator;
