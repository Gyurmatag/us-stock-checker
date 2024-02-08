import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[100vh] flex-col'>
      <header className='flex h-14 items-center justify-center px-4'>
        <Link className='flex items-center gap-2' href='/'>
          <ArrowRightIcon className='h-4 w-4' />
          <span className='font-semibold'>Return to App</span>
        </Link>
      </header>
      <main className='flex flex-1 flex-col items-center justify-center gap-4'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <BarChartIcon className='h-12 w-12' />
          <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
            404 - Page Not Found
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            It seems you&apos;ve stumbled upon a page that doesn&apos;t exist.
          </p>
        </div>
        <Link
          className='inline-flex h-9 items-center justify-center rounded-md border border-gray-200 px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
          href='/'
        >
          Return to App
        </Link>
      </main>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
      <path d='m12 5 7 7-7 7' />
    </svg>
  );
}

function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='12' x2='12' y1='20' y2='10' />
      <line x1='18' x2='18' y1='20' y2='4' />
      <line x1='6' x2='6' y1='20' y2='16' />
    </svg>
  );
}
