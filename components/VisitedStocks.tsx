'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function VisitedStocks() {
  const searchParams = useSearchParams();
  const [ticker, setTicker] = useState(searchParams.get('ticker'));
  const [tickers, setTickers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newTicker = searchParams.get('ticker');
    if (newTicker !== ticker) {
      setTicker(newTicker);
      if (newTicker !== null) {
        setTickers((prevTickers) => new Set([...prevTickers, newTicker]));
      }
    }
  }, [searchParams]);

  return (
    <div className='space-x-3'>
      {[...tickers].map((tickerItem, index) => (
        <Link
          className={`text-lg text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300 ${tickerItem === ticker ? 'underline' : ''}`}
          key={index}
          href={`/?ticker=${tickerItem}`}
        >
          {tickerItem}
        </Link>
      ))}
    </div>
  );
}
