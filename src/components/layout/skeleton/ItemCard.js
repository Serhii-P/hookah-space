import React from 'react'
import Skeleton from 'react-loading-skeleton';

export default function ItemCard({cards}) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex flex-col gap-2 items-center ">
        <div className='h-52 w-60	2xl:w-52 xl:w-36 sm:w-full'>
          <Skeleton  height="100%"/>
        </div>
        <div className='h-5 w-full'>
          <Skeleton  height="100%" />
        </div>
          <Skeleton  height={20} width={20} />
        <div className='w-36'>
          <Skeleton  height={40} />
        </div>
      </div>
    ));
}
