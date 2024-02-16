import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function GoogleButton() {
  return (
    <>
      <h2 className="mb-5 text-center">Login with google provider</h2>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex justify-center mx-auto max-w-[230px]  hover:shadow-blue-500/50 hover:shadow-lg"
      >
        <span className="bg-white p-3 ">
          <Image src={"/google.png"} alt={""} width={24} height={24} />
        </span>
        <span className="bg-blue-500 p-3 leading-[25px]">
          Login with google
        </span>
      </button>
    </>
  );
}
