import React from "react";
import Left from "./icons/Left";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      className="w-9	hover:opacity-60"
      type="button"
      onClick={() => router.back()}
    >
      <Left />
    </button>
  );
}
