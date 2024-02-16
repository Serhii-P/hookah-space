"use client";
import AddressInputs from "@/components/layout/forms/AddressInputs";
import { clearCart } from "@/redux/features/cartSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function OrderPage() {
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        dispatch(clearCart());
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);
  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <h2>Your order</h2>
        <div className="mt-4 mb-8 sm:px-2">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>

      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid px-6">
          <div>
            {order.cartProducts.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 border-b py-4"
              >
                <div className="w-24">
                  <Image
                    width={240}
                    height={240}
                    src={item.product.images[0]}
                    alt={""}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold sm:text-base	">
                    {item.product.name}
                  </h3>
                </div>
                <div className="text-lg font-semibold">
                  ${item.product.basePrice}
                </div>
              </div>
            ))}
            <div className="text-right py-2 text-gray-500">
              <br />
              Total:
              <span className="text-red-600 font-bold inline-block w-8 ps-2">
                ${order.totalPrice}
              </span>
            </div>
          </div>
          <div>
            <div className=" p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
