"use client";
import GoBackButton from "@/components/GoBackButton";
import CategoriesSection from "@/components/layout/CategoriesSection";
import SideMenu from "@/components/layout/SideMenu";
import MenuItem from "@/components/menu/MenuItem";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { id: categoryId } = useParams();
  const [mobMenuIsOpen, setMobMenuIsOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const categoryItems = items
          .filter((i) => i.category === categoryId)
          .map(({ _id, name, images, basePrice, isWhiteImgBackground }) => ({
            id: _id,
            name,
            images,
            basePrice,
            isWhiteImgBackground,
          }));
        setProducts(categoryItems);
      });
    });

    fetch("/api/categories").then((res) => {
      res.json().then((cat) => {
        setCategories(cat);
      });
    });
  }, []);

  const category = categories?.find((cat) => cat._id === categoryId);

  const sectionImages = {
    Bowls: "/bowls-cat.webp",
    Hookas: "/hookahs-cat.webp",
    "E-cigarettes": "/e-cigs-cat.webp",
    Coals: "/coals-cat.webp",
    Pipes: "/pipes-cat.webp",
    Bongs: "/bongs-cat.webp",
  };

  const sectionBg = sectionImages[category?.name] || null;
  const backgroundStyle = sectionBg
    ? { backgroundImage: `url(${sectionBg})` }
    : {};

  return (
    <div>
      <div
        style={backgroundStyle}
        className=" bg-cover bg-center text-center py-16	mb-10"
      >
        <div className="flex items-center justify-center">
          <GoBackButton />

          <h1 className="uppercase">{category?.name}</h1>
        </div>
      </div>
      <div
        className="hidden my-4 px-4 text-sm	font-semibold	 md:block "
        onClick={() => setMobMenuIsOpen((prev) => !prev)}
      >
        Show side pannel
      </div>
      {mobMenuIsOpen && (
        <SideMenu
          setMobMenuIsOpen={setMobMenuIsOpen}
          mobMenuIsOpen={mobMenuIsOpen}
        >
          <CategoriesSection categoryId={categoryId} categories={categories} />
        </SideMenu>
      )}
      <div className="flex md:px-4">
        <div className="w-3/12 min-w-80	md:hidden">
          <CategoriesSection categoryId={categoryId} categories={categories} />
        </div>
        <div className="grow grid grid-cols-4	 gap-4 lg:grid-cols-3 lg:gap-3 md:grid-cols-2">
          {products.length > 0 &&
            products.map((item) => <MenuItem key={item.id} {...item} />)}
        </div>
      </div>
    </div>
  );
}
