import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-5 my-20">
      <div className="w-12 h-12 border-b-2 rounded-full border-fecGreen animate-spin"></div>
    </div>
  );
};

export default Spinner;
