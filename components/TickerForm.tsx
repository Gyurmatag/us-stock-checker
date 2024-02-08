'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

const validateTicker = async (ticker: string) => {
  const response = await fetch(`/api/tickers/${ticker}`);
  const responseData = await response.json();
  if (!responseData.results || responseData.results.length === 0) {
    throw new Error('Ticker symbol is invalid or not found');
  }
};

const MIN_TICKER_LENGTH = 1;
const MAX_TICKER_LENGTH = 5;

const tickerValidationSchema = z.object({
  ticker: z
    .string()
    .min(MIN_TICKER_LENGTH, { message: 'Ticker must be at least 1 character.' })
    .max(MAX_TICKER_LENGTH, {
      message: 'Ticker must be no more than 5 characters.',
    })
    .superRefine(async (ticker, ctx) => {
      try {
        if (
          ticker.length >= MIN_TICKER_LENGTH &&
          ticker.length <= MAX_TICKER_LENGTH
        ) {
          await validateTicker(ticker);
        }
      } catch (e) {
        const message =
          e instanceof Error ? e.message : 'An unknown error occurred';
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message,
        });
      }
    }),
});

export function TickerForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultTicker = searchParams.get('ticker') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const form = useForm<{ ticker: string }>({
    resolver: zodResolver(tickerValidationSchema),
    defaultValues: {
      ticker: defaultTicker,
    },
    mode: 'onChange',
  });

  function onSubmit(data: { ticker: string }) {
    router.push(pathname + '?' + createQueryString('ticker', data.ticker));
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center space-x-5'
      >
        <div className='h-24 w-80'>
          <FormField
            control={form.control}
            name='ticker'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Ticker Symbol</FormLabel>
                <FormControl>
                  <Input
                    placeholder='TICKER'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' disabled={!form.formState.isValid}>
          <ArrowRight />
        </Button>
      </form>
    </Form>
  );
}
