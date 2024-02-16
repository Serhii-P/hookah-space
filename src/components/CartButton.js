import React from "react";
import Cart from "./icons/Cart";
// import { useAppSelector } from '@/redux/store';
import { totalCartItemsSelector } from "@/redux/features/cartSlice";
import { useSelector } from "react-redux";

export default function CartButton() {
  const totalItems = useSelector(totalCartItemsSelector);
  return (
    <div className="relative">
      <Cart />
      {!!totalItems && (
        <div
          key={totalItems}
          className="bg-red-500 flex justify-center items-center text-sm
        rounded-full w-5 h-5 absolute -top-2 -right-2 text-white animate-pingOnce
        "
        >
          {totalItems}
        </div>
      )}
    </div>
  );
}
