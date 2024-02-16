"use client";
import MenuItem from "@/components/menu/MenuItem";
import { removeFromFavorites } from "@/redux/features/favoritesSlice";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.favItems);
  const dispatch = useDispatch();
  return (
    <div>
      <h1 className="uppercase text-center my-20 md:my-10">Wish List</h1>

      {favorites.length > 0 ? (
        <div className="grow grid grid-cols-4	 gap-4 px-5 lg:grid-cols-3 lg:gap-3 md:grid-cols-2">
          {favorites.map((item) => (
            <div key={item.id}>
              <div
                onClick={() => dispatch(removeFromFavorites({ id: item.id }))}
                className=" cursor-pointer 	text-sm font-semibold	inline	hover:text-gray-400"
              >
                x remove
              </div>
              <MenuItem {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h3>Your Wish List is empty 😕</h3>
          <Link
            href="/"
            className="bg-basicGreen rounded-3xl mt-4  py-3 px-5 inline-block hover:bg-green-500"
          >
            Back to main page
          </Link>
        </div>
      )}
    </div>
  );
}
