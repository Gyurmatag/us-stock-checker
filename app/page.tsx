import { TickerForm } from '@/components/TickerForm';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [ticker: string]: string };
}) {
  const stockData = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${searchParams?.ticker}&token=${process.env.FINNHUB_API_KEY}`
  );
  console.log(stockData);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <TickerForm />
      </div>
    </main>
  );
}
