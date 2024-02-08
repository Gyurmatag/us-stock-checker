import React from 'react';
import Link from 'next/link';

import { CompanyProfile, StockPriceData } from '@/types/types';

type StockDetailsProps = {
  ticker: string;
  companyProfileData: CompanyProfile;
  stockPriceData: StockPriceData;
  displayedPeers: string[];
};

const StockDetails: React.FC<StockDetailsProps> = ({
  ticker,
  companyProfileData,
  stockPriceData,
  displayedPeers,
}) => {
  return (
    <div>
      <div className='mb-4 flex flex-col space-x-0 space-y-4 md:space-x-12 md:space-y-0 lg:flex-row'>
        <div className='space-y-1'>
          <p className='text-lg'>{ticker.toUpperCase()}</p>
          <h2 className='text-2xl font-bold'>{companyProfileData.name}</h2>
          <div className='flex items-center space-x-2'>
            <p className='text-3xl text-gray-900'>{stockPriceData.c}</p>
            <span
              className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold ${stockPriceData.d < 0 ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}
            >
              ({stockPriceData.dp.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className='flex flex-col justify-end'>
          <p className='flex justify-between space-x-6 text-sm text-gray-600'>
            <span className='font-semibold'>Previous Close:</span>
            <span>{stockPriceData.pc}</span>
          </p>
          <p className='flex justify-between text-sm text-gray-600'>
            <span className='font-semibold'>Today&apos;s Open:</span>
            <span>{stockPriceData.o}</span>
          </p>
          <p className='flex justify-between text-sm text-gray-600'>
            <span className='font-semibold'>Today&apos;s High:</span>
            <span>{stockPriceData.h}</span>
          </p>
          <p className='flex justify-between text-sm text-gray-600'>
            <span className='font-semibold'>Today&apos;s Low:</span>
            <span>{stockPriceData.l}</span>
          </p>
        </div>
      </div>
      <div className='flex flex-col space-y-1.5'>
        <h3 className='text-lg'>Similar Companies</h3>
        <div className='flex space-x-3'>
          {displayedPeers.map((peerTicker: string) => (
            <Link
              key={peerTicker}
              href={`/?ticker=${peerTicker}`}
              className='text-lg text-blue-500 hover:underline'
            >
              {peerTicker}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
