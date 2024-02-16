"use client";
import MenuItem from "../menu/MenuItem";
import { useEffect, useState } from "react";
import CategoryItem from "../menu/CategoryItem";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        const sellItems = menuItems
          .slice(-4)
          .map(({ _id, name, images, basePrice, isWhiteImgBackground }) => ({
            id: _id,
            name,
            images,
            basePrice,
            isWhiteImgBackground,
          }));
        setBestSellers(sellItems);
      });
    });

    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <>
      <div
        className="grid grid-cols-4 gap-4 px-4
      lg:grid-cols-3 lg:gap-3 md:grid-cols-2"
      >
        {categories &&
          categories.map((category) => (
            <CategoryItem key={category._id} {...category} />
          ))}
      </div>

      <div>
        <h6 className="uppercase opacity-70	text-center mt-10 mb-5">Top 4</h6>
        <div
          className="grid grid-cols-4	px-4 gap-4
        lg:grid-cols-3 lg:gap-3 md:grid-cols-2"
        >
          {bestSellers?.length > 0 &&
            bestSellers.map((item) => <MenuItem key={item.id} {...item} />)}
        </div>
      </div>
    </>
  );
}
