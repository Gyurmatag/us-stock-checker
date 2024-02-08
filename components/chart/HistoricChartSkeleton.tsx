import React from 'react';

const HistoricChartSkeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='mb-4 h-6 w-3/4 rounded-md bg-gray-300 dark:bg-gray-700'></div>

      <div className='flex items-center justify-center'>
        <div className='h-60 w-full rounded-md bg-gray-300 dark:bg-gray-700'></div>
      </div>
    </div>
  );
};

export default HistoricChartSkeleton;
