import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CategoriesSection({ categoryId, categories }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        setProducts(items);
      });
    });
  }, []);

  const countItemsInCategory = (id) => {
    return products?.filter((product) => product.category === id).length;
  };

  return (
    <aside className=" h-screen ">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <p className="uppercase font-semibold	mb-2">Categories</p>
        <ul className="space-y-2 font-medium">
          {categories &&
            categories.map((category) => {
              const isSelected = category._id === categoryId;
              const categoryClass = `text-sm ${
                isSelected ? "font-semibold" : "font-normal"
              }`;
              const badgeClass = `text-xs h-5 min-w-8 inline-flex items-center justify-center ${
                isSelected ? "border-red-600 bg-red-600" : "border"
              } rounded-3xl group-hover:bg-red-600 group-hover:border-red-600`;

              return (
                <li key={category._id}>
                  <Link
                    href={`/products/${category._id}`}
                    className={`flex items-center justify-between p-2 ${
                      isSelected ? "opacity-100" : "opacity-80"
                    } hover:opacity-100 group`}
                  >
                    <span className={categoryClass}>{category.name}</span>
                    <span className={badgeClass}>
                      {countItemsInCategory(category._id)}
                    </span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}
