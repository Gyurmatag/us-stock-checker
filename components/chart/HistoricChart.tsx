import React from 'react';
import { Card, Title } from '@tremor/react';
import { format, subYears } from 'date-fns';

import { HistoricPriceData } from '@/types/types';
import LineChartCore from '@/components/chart/LineChartCore';

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

  return (
    <Card>
      <Title>Stock Price Over Time (1y)</Title>
      <LineChartCore historicPriceData={historicPriceData}></LineChartCore>
    </Card>
  );
};

export default HistoricChart;
