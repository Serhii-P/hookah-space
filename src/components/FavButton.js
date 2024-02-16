import React from "react";
import Like from "./icons/Like";
import { useSelector } from "react-redux";

export default function FavButton() {
  const totalItems = useSelector((state) => state.favorites?.favItems);

  return (
    <div className="relative">
      <Like />
      {totalItems && totalItems.length > 0 && (
        <div
          key={totalItems.length}
          className="bg-red-500 flex justify-center items-center text-sm
        rounded-full w-5 h-5 absolute -top-2 -right-2 text-white animate-pingOnce
        "
        >
          {totalItems.length}
        </div>
      )}
    </div>
  );
}
