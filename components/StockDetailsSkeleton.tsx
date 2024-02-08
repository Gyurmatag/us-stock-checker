import React from 'react';

const StockDetailsSkeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='mb-4 flex flex-col space-x-0 space-y-4 md:space-x-12 md:space-y-0 lg:flex-row'>
        <div className='space-y-1'>
          <div className='h-6 w-24 rounded-md bg-gray-300 dark:bg-gray-700'></div>
          <div className='h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700'></div>
          <div className='flex items-center space-x-2'>
            <div className='h-8 w-16 rounded-md bg-gray-300 dark:bg-gray-700'></div>
            <div className='h-6 w-12 rounded-lg bg-gray-300 dark:bg-gray-700'></div>
          </div>
        </div>
        <div className='space-y-2'>
          {[...Array(4)].map((_, index) => (
            <div key={index} className='flex justify-between space-x-6'>
              <div className='h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700'></div>
              <div className='h-4 w-12 rounded-md bg-gray-300 dark:bg-gray-700'></div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col space-y-1.5'>
        <div className='h-6 w-32 rounded-md bg-gray-300 dark:bg-gray-700'></div>
        <div className='flex space-x-3'>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className='h-6 w-16 rounded-md bg-gray-300 dark:bg-gray-700'
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDetailsSkeleton;
