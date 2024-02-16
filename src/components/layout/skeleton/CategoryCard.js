import React from 'react'
import Skeleton from 'react-loading-skeleton';

export default function CategoryCard({cards}) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex flex-col gap-2 items-center ">
        <div className='h-52 w-80	2xl:w-52 sm:w-full'>
          <Skeleton  height="100%"/>
        </div>
        <div className='h-5 w-80	2xl:w-52 sm:w-full'>
          <Skeleton  height="100%" />
        </div>
      </div>
    ));
}
