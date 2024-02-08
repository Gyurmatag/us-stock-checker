import { format, subYears } from 'date-fns';

import { TickerForm } from '@/components/TickerForm';
import {
  CompanyPeers,
  CompanyProfile,
  HistoricPriceData,
  StockPriceData,
} from '@/types/types';
import HistoricChart from '@/components/HistoricChart';
import StockDetails from '@/components/StockDetails';

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
    <main className='flex min-h-screen flex-col items-center justify-between bg-gray-100 p-5 lg:p-24'>
      <div className='z-10 flex w-full max-w-7xl flex-col space-y-4 text-sm'>
        <TickerForm />
        {searchParams?.ticker && (
          <div className='flex flex-col space-y-4 rounded-lg bg-white p-5 shadow xl:flex-row xl:space-x-4 xl:space-y-0 '>
            <div className='flex-1'>
              <StockDetails
                ticker={searchParams.ticker}
                companyProfileData={companyProfileData}
                stockPriceData={stockPriceData}
                displayedPeers={displayedPeers}
              />
            </div>
            <div className='flex-1'>
              <HistoricChart rawData={historicPriceData.results} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
