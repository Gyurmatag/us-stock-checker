'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

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

const validateTicker = AwesomeDebouncePromise(async (ticker: string) => {
  const response = await fetch(`/api/tickers/${ticker}`);
  const responseData = await response.json();
  return !responseData.results || responseData.results.length === 0;
}, 300);

const MIN_TICKER_LENGTH = 1;
const MAX_TICKER_LENGTH = 5;

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

  const tickerValidationSchema = z.object({
    ticker: z
      .string()
      .superRefine((ticker, ctx) => {
        if (ticker.length < MIN_TICKER_LENGTH) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Ticker must at least 1 character.',
            fatal: true,
          });
          return z.NEVER;
        }
      })
      .superRefine((ticker, ctx) => {
        if (ticker.length > MAX_TICKER_LENGTH) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Ticker must at most 5 characters.',
            fatal: true,
          });
          return z.NEVER;
        }
      })
      .superRefine(async (ticker, ctx) => {
        const isTickerInvalid = await validateTicker(ticker);
        console.log(isTickerInvalid);
        if (isTickerInvalid) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Ticker should be a valid ticker symbol.',
          });
        }
      }),
  });

  const form = useForm<{ ticker: string }>({
    resolver: zodResolver(tickerValidationSchema, { async: true }),
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
                  <Input placeholder='TICKER' {...field} />
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
