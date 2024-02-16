"use client";
import DeleteButton from "@/components/DeleteButton";
import ProfileContainer from "@/components/layout/ProfileContainer";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <ProfileContainer isAdmin={true}>
      <section className="mt-8 max-w-2xl mx-auto lg:px-4">
        <form className="mt-8" onSubmit={handleCategorySubmit}>
          <div className=" gap-2 ">
            <div className="grow">
              <label className="text-white">
                {editedCategory ? "Update category" : "New category name"}
                {editedCategory && (
                  <>
                    : <b>{editedCategory.name}</b>
                  </>
                )}
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(ev) => setCategoryName(ev.target.value)}
              />
            </div>
            <div className="mt-4 flex gap-4 max-w-xs	">
              <button className="" type="submit">
                {editedCategory ? "Update" : "Create"}
              </button>
              <button
                className="bg-gray-400	hover:bg-gray-500"
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setCategoryName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        <div>
          <h2 className="mt-8 text-sm opacity-70	">Existing categories</h2>
          {categories?.length > 0 &&
            categories.map((c) => (
              <div
                key={c._id}
                className="border border-slate-400	 rounded-xl p-2 px-4 flex mb-2 items-center"
              >
                <div className="grow opacity-70">{c.name}</div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditedCategory(c);
                      setCategoryName(c.name);
                    }}
                  >
                    Edit
                  </button>
                  <DeleteButton
                    label="Delete"
                    onDelete={() => handleDeleteClick(c._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    </ProfileContainer>
  );
}
