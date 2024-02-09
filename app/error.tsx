'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleGoBack = () => {
    // WORKAROUND - there is a problem with the internal Next.js router
    window.location.href = '/';
  };

  return (
    <div className='flex min-h-[80vh] w-full flex-col items-center justify-center space-y-4 py-6'>
      <div className='flex flex-col items-center justify-center space-y-2 text-center'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
          Oops! Something went wrong.
        </h1>
        <p className='max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
          Probably you searched (in the URL search params) for a ticker that
          doesn&apos;t exist or the API services we are calling are down.
        </p>
      </div>
      <div className='flex flex-col gap-2 min-[400px]:flex-row'>
        <Button
          className='inline-flex h-9 items-center justify-center rounded-md border border-gray-200 px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
          onClick={handleGoBack}
        >
          Return to App
        </Button>
      </div>
    </div>
  );
}
