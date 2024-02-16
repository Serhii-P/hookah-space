"use client";
import QtyButtons from "@/components/QtyButtons";
import Like from "@/components/icons/Like";
import CategoriesSection from "@/components/layout/CategoriesSection";
import ImagesSlider from "@/components/layout/ImagesSlider";
import SideMenu from "@/components/layout/SideMenu";
import ProductMenu from "@/components/layout/skeleton/ProductMenu";
import MenuItem from "@/components/menu/MenuItem";
import {
  decrement,
  increment,
  productQtyInCartSelector,
} from "@/redux/features/cartSlice";
import { addToFavorites } from "@/redux/features/favoritesSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const crumbs = [
  { label: "Home", path: "/" },
  { label: "Hookahs", path: "/products" },
  { label: "My profile" },
];

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loginInProgress, setLoginInProgress] = useState(false);

  const { id: productId } = useParams();
  const [category, setCategory] = useState(null);
  const [mobMenuIsOpen, setMobMenuIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoginInProgress(true);
    fetch("/api/menu-items").then((res) => {
      res.json().then((elements) => {
        const productDetails = elements.find((el) => el._id === productId);
        setProduct(productDetails);
        setAllProducts(elements);
        setLoginInProgress(false);
      });
    });

    fetch("/api/categories").then((res) => {
      res.json().then((cat) => {
        setCategories(cat);
      });
    });
  }, []);

  useEffect(() => {
    if (categories && product) {
      const categoryInfo = categories.find(
        (cat) => cat._id === product.category
      );
      setCategory(categoryInfo);
    }
  }, [categories, product]);

  useEffect(() => {
    if (category && allProducts) {
      const similarItems = allProducts.filter(
        (el) => el.category === category?._id
      );
      setSimilar(similarItems.slice(-4));
    }
  }, [category, allProducts]);

  const productDetails = product
    ? {
        id: product._id,
        name: product.name,
        images: product.images,
        basePrice: product.basePrice,
      }
    : null;

  const qty = useSelector((state) =>
    productQtyInCartSelector(state, productId)
  );

  return (
    <>
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
          <CategoriesSection
            categoryId={category?._id}
            categories={categories}
          />
        </SideMenu>
      )}
      <div className="flex ">
        <div className="w-3/12 min-w-80	xl:min-w-56 md:hidden">
          <CategoriesSection
            categoryId={category?._id}
            categories={categories}
          />
        </div>
        {loginInProgress && <ProductMenu />}
        <div className="grow grid grid-cols-2	 gap-4 py-12 md:py-4 md:grid-cols-1">
          <div className="px-12 xl:px-4">
            <ImagesSlider images={product?.images} />
          </div>

          <div className="md:px-4">
            <h2 className="text-4xl	py-5 mb-4 md:text-xl md:py-2 md:mb-0">
              {product?.name}
            </h2>
            <p className="text-red-600 font-semibold	mb-4">
              <span className="text-white">Price:&nbsp;&nbsp;</span>$
              {product?.basePrice}
            </p>
            {!qty ? (
              <button
                onClick={() => dispatch(increment(productDetails))}
                className="bg-basicGreen px-8 py-2 rounded-full w-auto  block  hover:bg-green-500"
              >
                Add to cart
              </button>
            ) : (
              <QtyButtons
                onDecrease={() => dispatch(decrement(productDetails))}
                onIncrease={() => dispatch(increment(productDetails))}
                qty={qty}
              />
            )}
            <div
              className="flex gap-2 mt-5 cursor-pointer hover:opacity-80"
              onClick={() => dispatch(addToFavorites(productDetails))}
            >
              <Like />
              <p>Add to the Wish List</p>
            </div>

            <hr className="opacity-15	my-5" />
            <p className="mb-3 opacity-80 text-sm	font-normal	">
              Ref: {product?._id}
            </p>
            <p className="opacity-80 text-sm	font-normal	">
              Category: {category?.name}
            </p>
          </div>
        </div>
      </div>
      <hr className="opacity-15	mt-3 mb-10" />
      <h2 className="uppercase ps-4	mb-4">Similar products</h2>
      <div className="grid grid-cols-4	 gap-4 px-4 lg:grid-cols-3 lg:gap-3 md:grid-cols-2">
        {similar?.length > 0 &&
          similar.map((item) => (
            <MenuItem
              key={item._id}
              images={item.images}
              name={item.name}
              basePrice={item.basePrice}
              isWhiteImgBackground={item.isWhiteImgBackground}
              id={item._id}
            />
          ))}
      </div>
    </>
  );
}
