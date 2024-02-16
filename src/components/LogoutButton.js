import React from "react";
import Logout from "./icons/Logout";

export default function LogoutButton({ logOut }) {
  return (
    <button
      onClick={logOut}
      className="bg-primary rounded-full text-white px-8 py-2 border-zinc-100 border
          max-w-40	flex justify-center items-center gap-2	mx-auto mt-4  hover:border-zinc-300
          hover:text-zinc-300"
    >
      <span>
        <Logout />
      </span>
      Logout
    </button>
  );
}
