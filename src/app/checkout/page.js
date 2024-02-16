"use client";
import Left from "@/components/icons/Left";
import AddressInputs from "@/components/layout/forms/AddressInputs";
import { useProfile } from "@/hooks/useProfile";
import { TotalPriceSelector } from "@/redux/features/cartSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const [address, setAddress] = useState({});

  const { data: profileData } = useProfile();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector(TotalPriceSelector);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  if (cartItems?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <h2 className="mt-4">Your shopping cart is empty 😔</h2>
        <p className="opacity-50">
          Before proceed to checkout you must add some products to your shopping
          cart. You will find a lot of interesting products on our Main page.
        </p>
        <Link
          href="/"
          className="bg-basicGreen rounded-3xl	 py-3 px-5 inline-block"
        >
          Back to main page
        </Link>
      </section>
    );
  }

  async function proceedToCheckout(e) {
    e.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartItems,
          totalPrice,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  return (
    <div>
      <h2 className="text-5xl text-center mt-20">Checkout</h2>
      <Link
        href="cart"
        className="flex justify-center gap-2 mt-3 text-zinc-400 hover:text-zinc-600"
      >
        <Left />
        Back to the cart
      </Link>
      <div
        className=" flex gap-4 justify-around py-20 px-5 
    lg:justify-between md:flex-col md:py-10"
      >
        <form
          className="lg:w-2/4	md:mx-auto md:mb-10 sm:w-full"
          onSubmit={proceedToCheckout}
        >
          <h2>Personal information</h2>
          <AddressInputs
            addressProps={address}
            setAddressProp={handleAddressChange}
          />
          <button type="submit" className="mt-5">
            Pay ${totalPrice}
          </button>
        </form>
        <div className="md:border-t-2 border-zinc-600 md:pt-5">
          <h2>Your order</h2>
          <div className="flex justify-between mt-4 border-b border-zinc-600">
            <p>Product</p>
            <p>Price</p>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center py-5 border-b border-zinc-600	"
            >
              <p className="text-zinc-400 text-center font-normal	text-sm	">
                {item.product.name}
              </p>

              <p className="font-normal">
                ${item.qty * item.product.basePrice}
              </p>
            </div>
          ))}
          <div className="flex justify-between border-b border-zinc-600 py-5">
            <p>Total:</p>
            <p className="text-red-500">${totalPrice}</p>
          </div>
          <p className="text-sm	font-normal text-zinc-400 mt-4">
            Your personal data will be used to facilitate your work with the
            site and for other purposes described in our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
