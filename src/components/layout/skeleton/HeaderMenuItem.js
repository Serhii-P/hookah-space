import React from "react";
import Skeleton from "react-loading-skeleton";

export default function HeaderMenuItem({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex gap-2 items-center">
        <div>
          <Skeleton width={30} height={40} />
        </div>
        <div>
          <Skeleton height={20} width={60} />
        </div>
      </div>
    ));
}
