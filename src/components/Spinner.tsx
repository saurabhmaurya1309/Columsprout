// src/components/Spinner.tsx

import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
    </div>
  );
};

export default Spinner;
