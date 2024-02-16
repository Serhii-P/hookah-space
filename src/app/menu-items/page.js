"use client";
import { Right } from "@/components/icons/Right";
import ProfileContainer from "@/components/layout/ProfileContainer";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <ProfileContainer isAdmin={true}>
      <section className="mt-8 px-8 md:px-4">
        <div className="mt-8">
          <Link className="button gap-3" href={"/menu-items/new"}>
            <span>Crete new menu item</span>
            <Right />
          </Link>
        </div>
        <div>
          <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
          <div className="grid grid-cols-4 gap-2 lg:grid-cols-3 md:grid-cols-2">
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <Link
                  key={item._id}
                  style={
                    item?.isWhiteImgBackground
                      ? { background: "#fff" }
                      : { background: "transparent" }
                  }
                  href={"/menu-items/edit/" + item._id}
                  className="border-2 border-slate-400 hover:border-white rounded-lg p-4"
                >
                  <div className="flex flex-col	h-full justify-between">
                    <div className="mb-2 flex justify-center">
                      <Image
                        className="rounded-md"
                        src={item?.images?.[0]}
                        alt={""}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex justify-around">
                      {item?.images.slice(1).map((img) => (
                        <div key={img}>
                          <Image
                            className="rounded-md"
                            src={img}
                            alt={""}
                            width={50}
                            height={50}
                          />
                        </div>
                      ))}
                    </div>
                    <div
                      className={`text-center mt-2 text-xs ${
                        item?.isWhiteImgBackground ? "text-black" : "text-white"
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </ProfileContainer>
  );
}
