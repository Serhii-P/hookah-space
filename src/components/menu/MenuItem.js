import {
  increment,
  productQtyInCartSelector,
} from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Like from "../icons/Like";
import { addToFavorites } from "@/redux/features/favoritesSlice";
import Checked from "../icons/Checked";
import { usePathname } from "next/navigation";

export default function MenuItem({
  images,
  name,
  basePrice,
  isWhiteImgBackground,
  id,
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const address = pathname.replace(/^\/+/g, "");

  const product = { id, images, name, basePrice };
  const addToCartHandler = () => {
    dispatch(increment(product));
  };

  const qty = useSelector((state) => productQtyInCartSelector(state, id));
  const currentFav = useSelector((state) => state.favorites?.favItems);

  const likedProduct = currentFav?.find((el) => el.id === id);
  return (
    <div
      className="relative group flex flex-col h-full
    "
    >
      {address !== "favorites" && (
        <div
          onClick={() => dispatch(addToFavorites(product))}
          className="absolute p-2 top-2 right-2 w-12 h-12 bg-black z-10 cursor-pointer
  flex items-center justify-center hover:text-gray-400
  opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          {likedProduct ? <Checked /> : <Like />}
        </div>
      )}
      <div
        className={`cursor-pointer ${
          isWhiteImgBackground ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="relative transition-all duration-700">
          <Link href={`/product/${id}`}>
            <Image src={images[0]} alt={name} width={500} height={500} />
          </Link>
        </div>
      </div>
      <h5 className="text-center my-2 sm:text-xs	sm:my-1">{name}</h5>
      <h4 className="text-red-600 text-center ">${basePrice}</h4>

      <button
        disabled={qty > 0}
        onClick={addToCartHandler}
        className="bg-basicGreen mt-4 px-8 py-2 rounded-full w-auto mx-auto block hover:bg-green-500
        sm:mt-1 sm:px-4 sm:text-xs	"
      >
        Add to cart
      </button>
    </div>
  );
}
