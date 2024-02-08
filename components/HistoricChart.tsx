import React from 'react';
import { Card, LineChart, Title } from '@tremor/react';
import { format, subYears } from 'date-fns';
import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

import { HistoricPriceData } from '@/types/types';

type HistoricChartProps = {
  ticker: string;
};

const HistoricChart: React.FC<HistoricChartProps> = async ({ ticker }) => {
  const today = new Date();
  const lastYear = subYears(today, 1);
  const formattedToday = format(today, 'yyyy-MM-dd');
  const formattedLastYear = format(lastYear, 'yyyy-MM-dd');

  const historicPriceDataResponse = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formattedLastYear}/${formattedToday}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`
  );

  const historicPriceData =
    (await historicPriceDataResponse.json()) as HistoricPriceData;

  const chartData = historicPriceData.results.map((data) => {
    const date = new Date(data.t);
    return {
      fullDate: format(date, 'yyyy-MM-dd'),
      month: format(date, 'yyyy. MMM.'),
      'Stock Price': data.c,
    };
  });

  const customTooltip = ({
    payload,
    active,
  }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div className='rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border w-56 border p-2'>
        <div className='space-y-1'>
          <p className='text-tremor-content-emphasis font-medium'>
            {payload[0].value} USD
          </p>
          <p className='text-tremor-content'>{payload[0].payload.fullDate}</p>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <Title>Stock Price Over Time (1y)</Title>
      <LineChart
        className='mt-6'
        data={chartData}
        index='month'
        categories={['Stock Price']}
        colors={['emerald']}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default HistoricChart;
