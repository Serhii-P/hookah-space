"use client";
import CartItemCard from "@/components/layout/CartItemCard";
import { TotalPriceSelector, clearCart } from "@/redux/features/cartSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  const totalPrice = useSelector(TotalPriceSelector);
  return (
    <div className="p-2">
      <h2 className="my-16 text-center text-5xl">CART</h2>
      {cartItems.length > 0 ? (
        <div className="flex justify-between gap-4 lg:flex-col">
          <div className="grow">
            <table className="table-auto w-full">
              <thead>
                <tr className="uppercase font-semibold border-b border-zinc-600 pb-3 h-12 align-top md:hidden">
                  <th colSpan="2" className="text-center">
                    Product
                  </th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Summary</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <CartItemCard key={item.product.id} cartItem={item} />
                ))}
              </tbody>
            </table>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-slate-600 mt-4 ml-auto	block w-auto p-3 hover:bg-slate-400"
            >
              Clear the cart
            </button>
          </div>
          <div
            className="w-3/12	border-[3px] p-6 border-zinc-600	
          lg:border-x-0 lg:border-b-0 lg:w-full lg:mt-10"
          >
            <h2 className="uppercase mb-5">Cart summary</h2>
            <hr className="border-zinc-600	" />
            <div className="flex justify-between my-5">
              <h4 className="">Total Price:</h4>
              <h2 className="font-bold text-red-600">{totalPrice} $</h2>
            </div>
            <Link
              href="/checkout"
              className="bg-basicGreen rounded-3xl w-full text-center  py-3 px-5 inline-block  hover:bg-green-500"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-5xl	">Cart is empty</h2>
          <p className="opacity-50 w-80	mx-auto my-5">
            Before proceed to checkout you must add some products to your
            shopping cart. You will find a lot of interesting products on our
            Main page.
          </p>
          <Link
            href="/"
            className="bg-basicGreen rounded-3xl	 py-3 px-5 inline-block  hover:bg-green-500"
          >
            Back to main page
          </Link>
        </div>
      )}
    </div>
  );
}
