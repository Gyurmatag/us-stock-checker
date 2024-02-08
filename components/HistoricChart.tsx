'use client';

import React from 'react';
import { Card, LineChart, Title } from '@tremor/react';
import { format } from 'date-fns';
import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

import { HistoricPriceResult } from '@/types/types';

type HistoricChartProps = {
  rawData: HistoricPriceResult[];
};

export default function HistoricChart({ rawData }: HistoricChartProps) {
  const chartData = rawData.map((data) => {
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
        customTooltip={customTooltip}
      />
    </Card>
  );
}
