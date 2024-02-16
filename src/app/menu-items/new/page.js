"use client";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/forms/MenuItemForm";
import ProfileContainer from "@/components/layout/ProfileContainer";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error123",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <ProfileContainer isAdmin={true}>
      <section className=" px-8">
        <Link href={"/menu-items"} className="button gap-3">
          <Left />
          <span>Show all menu items</span>
        </Link>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
      </section>
    </ProfileContainer>
  );
}
