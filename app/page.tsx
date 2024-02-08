import { Suspense } from 'react';

import { TickerForm } from '@/components/TickerForm';
import HistoricChart from '@/components/HistoricChart';
import StockDetails from '@/components/StockDetails';
import HistoricChartSkeleton from '@/components/HistoricChartSkeleton';
import StockDetailsSkeleton from '@/components/StockDetailsSkeleton';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [ticker: string]: string };
}) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-5 lg:p-24'>
      <div className='z-10 flex w-full max-w-7xl flex-col space-y-4 text-sm'>
        <TickerForm />
        {searchParams?.ticker && (
          <div className='flex flex-col space-y-4 rounded-lg bg-white p-5 shadow xl:flex-row xl:space-x-4 xl:space-y-0 '>
            <div className='flex-1'>
              <Suspense
                key={searchParams.ticker}
                fallback={<StockDetailsSkeleton />}
              >
                <StockDetails ticker={searchParams.ticker} />
              </Suspense>
            </div>
            <div className='flex-1'>
              <Suspense
                key={searchParams.ticker}
                fallback={<HistoricChartSkeleton />}
              >
                <HistoricChart ticker={searchParams.ticker} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
