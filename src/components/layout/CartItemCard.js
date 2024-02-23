"use client";
import QtyButtons from "../QtyButtons";
import Image from "next/image";
import {
  decrement,
  increment,
  removeFromCart,
} from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function CartItemCard({ cartItem }) {
  const windowWidth = useWindowWidth();

  const dispatch = useDispatch();

  return (
    <tr
      className="border-b md:border-y border-zinc-600 py-2"
      style={{ paddingY: "0.5rem" }}
    >
      {windowWidth >= 768 && (
        <>
          <td>
            <div className="flex items-center justify-center">
              <div
                onClick={() =>
                  dispatch(removeFromCart({ id: cartItem.product.id }))
                }
                className="text-center cursor-pointer text-lg hover:text-gray-400"
              >
                x
              </div>
              <Image
                src={cartItem.product.images[0]}
                width={100}
                height={100}
                alt={cartItem.product.name}
                className="rounded-md"
              />
            </div>
          </td>
          <td>
            <div>
              <div className="text-sm font-semibold ps-2 hidden md:block">
                Name:
              </div>
              <div className="font-normal text-sm opacity-80">
                {cartItem.product.name}
              </div>
            </div>
          </td>
          <td>
            <div>
              <div className="text-sm font-semibold ps-2 hidden md:block">
                Price:
              </div>
              <div className="text-center font-normal text-sm opacity-80">
                {cartItem.product.basePrice} $
              </div>
            </div>
          </td>
          <td>
            <div className="flex justify-center">
              <div className="text-sm font-semibold ps-2 hidden md:block">
                Quantity:
              </div>
              <QtyButtons
                qty={cartItem.qty}
                onDecrease={() => dispatch(decrement(cartItem.product))}
                onIncrease={() => dispatch(increment(cartItem.product))}
              />
            </div>
          </td>
          <td>
            <div>
              <div className="text-sm font-semibold ps-2 hidden md:block">
                Total price:
              </div>
              <div className="text-center font-semibold text-red-600">
                {cartItem.qty * cartItem.product.basePrice} $
              </div>
            </div>
          </td>
        </>
      )}

      {windowWidth < 768 && (
        <>
          <td colSpan="7">
            <div className="flex py-2">
              <div className="flex items-center">
                <div
                  onClick={() =>
                    dispatch(removeFromCart({ id: cartItem.product.id }))
                  }
                  className="text-center cursor-pointer text-lg hover:text-gray-400"
                >
                  x
                </div>
                <Image
                  src={cartItem.product.images[0]}
                  width={100}
                  height={100}
                  alt={cartItem.product.name}
                  className="rounded-md"
                />
              </div>

              <div className="w-full px-5">
                <div className="flex justify-between ">
                  <div className="text-sm font-semibold ps-2 ">Name:</div>
                  <div className="text-center font-normal text-sm opacity-80">
                    {cartItem.product.name}
                  </div>
                </div>

                <div className="border-y border-dotted border-zinc-700	my-3 py-3 flex justify-between">
                  <div className="text-sm font-semibold ps-2">Price:</div>
                  <div className="text-center font-normal text-sm opacity-80">
                    {cartItem.product.basePrice} $
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-semibold ps-2">Quantity:</div>
                  <QtyButtons
                    qty={cartItem.qty}
                    onDecrease={() => dispatch(decrement(cartItem.product))}
                    onIncrease={() => dispatch(increment(cartItem.product))}
                  />
                </div>

                <div className="border-t border-dotted border-zinc-700 flex justify-between py-3">
                  <div className="text-sm font-semibold ps-2">Total price:</div>
                  <div className="text-center font-semibold text-red-600">
                    {cartItem.qty * cartItem.product.basePrice} $
                  </div>
                </div>
              </div>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
