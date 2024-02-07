import { format, subYears } from 'date-fns';
import { TickerForm } from '@/components/TickerForm';
import {
  CompanyPeers,
  CompanyProfile,
  HistoricPriceData,
  StockPriceData,
} from '@/types/types';
import Link from 'next/link';
import HistoricChart from '@/components/HistoricChart';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [ticker: string]: string };
}) {
  const today = new Date();
  const lastYear = subYears(today, 1);
  const formattedToday = format(today, 'yyyy-MM-dd');
  const formattedLastYear = format(lastYear, 'yyyy-MM-dd');

  const companyProfileDataResponse = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${searchParams?.ticker}&token=${process.env.FINNHUB_API_KEY}`
  );
  const stockPriceDataResponse = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${searchParams?.ticker}&token=${process.env.FINNHUB_API_KEY}`
  );
  const companyPeersDataResponse = await fetch(
    `https://finnhub.io/api/v1/stock/peers?symbol=${searchParams?.ticker}&token=${process.env.FINNHUB_API_KEY}`
  );
  const historicPriceDataResponse = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${searchParams?.ticker}/range/1/day/${formattedLastYear}/${formattedToday}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`
  );

  const companyProfileData =
    (await companyProfileDataResponse.json()) as CompanyProfile;
  const stockPriceData =
    (await stockPriceDataResponse.json()) as StockPriceData;
  const companyPeersData =
    (await companyPeersDataResponse.json()) as CompanyPeers;
  const historicPriceData =
    (await historicPriceDataResponse.json()) as HistoricPriceData;

  const displayedPeers = companyPeersData.slice(1, 4);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-gray-100 p-24'>
      <div className='z-10 flex w-full max-w-5xl flex-col space-y-4 text-sm'>
        <TickerForm />
        {searchParams?.ticker && (
          <div className='space-y-4 rounded-lg bg-white p-5 shadow'>
            <div className='mb-4 flex space-x-12'>
              <div className='space-y-1'>
                <p className='text-lg'>{searchParams?.ticker.toUpperCase()}</p>
                <h2 className='text-2xl font-bold'>
                  {companyProfileData.name}
                </h2>
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
                <p className='flex space-x-6 text-sm text-gray-600'>
                  <span className='font-semibold'>Previous Close:</span>{' '}
                  <span>{stockPriceData.pc}</span>
                </p>
                <p className='flex justify-between text-sm text-gray-600'>
                  <span className='font-semibold'>Today&apos;s Open:</span>{' '}
                  <span>{stockPriceData.o}</span>
                </p>
                <p className='flex justify-between  text-sm text-gray-600'>
                  <span className='font-semibold'>Today&apos;s High:</span>{' '}
                  <span>{stockPriceData.h}</span>
                </p>
                <p className='flex justify-between text-sm text-gray-600'>
                  <span className='font-semibold'>Today&apos;s Low:</span>{' '}
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
            <HistoricChart rawData={historicPriceData.results} />
          </div>
        )}
      </div>
    </main>
  );
}
