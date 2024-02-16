import React from "react";
import Trash from "./icons/Trash";

export default function QtyButtons({ onIncrease, onDecrease, qty }) {
  return (
    <div className="flex items-center">
      <button
        className="px-3 w-10 h-10 bg-transparent shadow-none border-2 border-gray-500 rounded-tl-full rounded-bl-full"
        onClick={onDecrease}
      >
        {qty && qty === 1 ? <Trash className="w-4" /> : "-"}
      </button>
      <p className="border-y-2 border-gray-500 w-10 h-10 text-center leading-9	">
        {qty}
      </p>
      <button
        className="px-3 w-10 h-10 bg-transparent shadow-none border-2 border-gray-500 rounded-tr-full rounded-br-full"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}
