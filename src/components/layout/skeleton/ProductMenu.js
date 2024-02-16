import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ProductMenu() {
  return (
    <div className="flex gap-10 px-10 pt-10 w-full sm:flex-col sm:px-5">
      <div>
        <div className="h-64 w-96 mb-3 lg:w-52 sm:w-full">
          <Skeleton height="100%" />
        </div>
        <div className="flex gap-5">
          <Skeleton
            count={4}
            inline
            height={80}
            width={80}
            style={{ marginRight: "15px" }}
          />
        </div>
      </div>
      <div className="w-full pt-5">
        <Skeleton height={50} width="100%" />
        <Skeleton width={100} height={25} style={{ margin: "20px 0" }} />
        <Skeleton height={40} width={160} />
        <hr className="border-1 border-zinc-600 my-3" />
        <Skeleton count={3} />
      </div>
    </div>
  );
}
