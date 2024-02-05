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
import useRefinement, { RefinementCallback } from '@/hooks/use-refinement';

const tickerValidationSchema = z.object({
  ticker: z
    .string()
    .min(1, { message: 'Ticker must be at least 1 character.' })
    .max(5, { message: 'Ticker must be no more than 5 characters.' }),
});

type Ticker = z.infer<typeof tickerValidationSchema>;

function checkTickerValidity(): RefinementCallback<Ticker> {
  return async (data, { signal }) => {
    const apiKey = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
    console.log(apiKey);
    const response = await fetch(
      `https://api.polygon.io/v3/reference/tickers?ticker=${data.ticker}&active=true&apiKey=${apiKey}`,
      { signal }
    );
    const responseData = await response.json();
    return responseData.results && responseData.results.length > 0;
  };
}

export function TickerForm() {
  const isTickerValid = useRefinement(checkTickerValidity(), {
    debounce: 300,
  });
  const form = useForm<{ ticker: string }>({
    resolver: zodResolver(
      tickerValidationSchema.refine(isTickerValid, {
        message: 'Ticker not found.',
        path: ['ticker'],
      })
    ),
    defaultValues: {
      ticker: '',
    },
    mode: 'all',
  });

  function onSubmit(data: { ticker: string }) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-2/3 items-end space-x-5'
      >
        <div>
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
                      isTickerValid.invalidate();
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
