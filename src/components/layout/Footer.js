"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/hookah-logo.jpg";
import Map from "../icons/Map";
import Phone from "../icons/Phone";
import Mail from "../icons/Mail";
import { useSession } from "next-auth/react";
import User from "../icons/User";
import FavButton from "../FavButton";
import CartButton from "../CartButton";

export default function Footer() {
  const session = useSession();
  const status = session?.status;
  return (
    <footer className="pt-20 sm:pt-10 pb-4 text-neutral-400	text-sm font-normal		lg:pb-24">
      <div
        className="fixed bottom-0 w-full p-5 bg-stone-900	text-white
       justify-around items-center hidden lg:flex z-10
      "
      >
        <div className="">
          {status === "authenticated" ? (
            <Link href={"/my-account"} className="flex flex-col	items-center">
              <User />
              <span>My profile</span>
            </Link>
          ) : (
            <Link href={"/login"} className="flex flex-col	items-center">
              <User />
              <span>Login/Register</span>
            </Link>
          )}
        </div>
        <Link href="/favorites" className="flex flex-col	items-center">
          <FavButton />
          <span>Wish List</span>
        </Link>

        <Link href="/cart" className="flex flex-col	items-center">
          <CartButton />
          <span>Cart</span>
        </Link>
      </div>
      <div className="flex justify-between px-14 md:px-4 sm:flex-col">
        <div>
          <Link href="/">
            <Image src={logo} alt="hookah space" width={200} />
          </Link>
          <p className="my-5">
            Shop No. 1 for hookahs and tobacco. <br />
            We have chosen the best for you!
          </p>
          <div className="flex gap-1">
            <Map />
            <p>Kyiv</p>
          </div>
          <div className="flex gap-1 my-5">
            <Phone />
            <Mail />
            <p>Email: hookah-space@example.com</p>
          </div>
        </div>
        <div>
          <p className="text-base	font-semibold	mb-5 text-white">
            BUYER&apos;S CORNER
          </p>
          <ul className="cursor-pointer space-y-3.5">
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Payment and delivery</li>
            <li>Last news</li>
          </ul>
        </div>
      </div>
      <hr className="border-zinc-700	sm:mt-5" />
      <div className="flex items-center justify-center mt-8 mb-4 gap-3">
        <Image
          src="/master-card.svg"
          alt="master card"
          width={52}
          height={40}
        />
        <Image src="/visa.svg" alt="visa" width={125} height={40} />
      </div>
      <p className="text-center">&copy; 2024 All right reserved</p>
    </footer>
  );
}
