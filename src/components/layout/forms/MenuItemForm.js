import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [images, setImages] = useState(menuItem?.images || []);
  const [isWhiteImgBackground, setIsWhiteImgBackground] = useState(
    menuItem?.isWhiteImgBackground || false
  );
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  function updateImagesOrder(images) {
    setImages(images);
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            console.log(link);
            setImages((oldImages) => {
              return [...oldImages, link];
            });
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  }

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          images,
          isWhiteImgBackground,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="mt-8 "
    >
      <div
        className=" items-start gap-12 "
        style={{ gridTemplateColumns: " .7fr .3fr" }}
      >
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label className="mt-4 block">Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <div className="my-8">
            <label>Category</label>
            <select
              className="ml-5 p-2 border-2 border-slate-400 hover:border-white bg-transparent cursor-pointer"
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
            >
              <option value="" disabled hidden>
                Choose category...
              </option>
              {categories?.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="imgBgCb"
            >
              <input
                id="imgBgCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={isWhiteImgBackground}
                onChange={(ev) => setIsWhiteImgBackground(ev.target.checked)}
              />
              <span>White image background</span>
            </label>
          </div>
          <button className="max-w-60	mx-auto" type="submit">
            Save
          </button>
        </div>
        <div className="mt-5">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  style={
                    isWhiteImgBackground
                      ? { background: "#fff" }
                      : { background: "transparent" }
                  }
                  className=" p-4 mb-2 shadow-sm rounded-lg border border-gray-200"
                >
                  <img src={link} alt="" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>

          {!images && (
            <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
              No image
            </div>
          )}
          <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
              Choose image
            </span>
          </label>
        </div>
      </div>
    </form>
  );
}
